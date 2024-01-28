import axios, { CreateAxiosDefaults } from 'axios';

import { apiUrl } from '@/config';
import { refreshToken as refreshTokenApi } from '@/services/auth';
import store from '@/store';
import { userSlide } from '@/store/user';
import { ITokens } from '@/types/auth';

let refreshTokenRequest: Promise<ITokens> | null = null;

const axiosConfig: CreateAxiosDefaults = {
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'x-header-access-code': 'fashionicons',
  },
};
const axiosApiInstance = axios.create(axiosConfig);

const getToken = () => store?.getState().user.tokens;
const setTokens = (tokens: ITokens | null) => store?.dispatch(userSlide.actions.setTokens(tokens));

const isExpired = (date: string) => {
  return new Date(date).getTime() < Date.now() + 15 * 60_000;
};

const getRefreshToken = async (refreshToken: string) => {
  const tokensData = await refreshTokenApi(refreshToken);
  if (![200, 201].includes(tokensData.status)) throw tokensData;
  return tokensData.data.tokens;
};

const refreshToken = async (tokens?: ITokens | null) => {
  try {
    if (!tokens) {
      tokens = getToken();
      if (!tokens) throw new Error('token not found');
    }

    if (isExpired(tokens.refresh.expires)) throw new Error('refresh token expired');
    refreshTokenRequest = refreshTokenRequest ?? getRefreshToken(tokens.refresh.token);
    const newToken = await refreshTokenRequest;
    // reset token request for the next expiration
    refreshTokenRequest = null;
    await setTokens(newToken);
    return newToken.access.token;
  } catch (err) {
    console.error(err);
    // reset tokens
    await setTokens(null);
    return null;
  }
};

async function getAccessToken() {
  try {
    let tokens = getToken();
    if (!tokens) return null;

    if (isExpired(tokens.access.expires)) return refreshToken(tokens);

    return tokens?.access.token;
  } catch {
    return null;
  }
}

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      } as any;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    if ([401, 403].includes(error.response.status) && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshToken();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const axiosNoAuthInstance = axios.create(axiosConfig);

export default axiosApiInstance;
