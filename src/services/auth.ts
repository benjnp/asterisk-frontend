import { IAuth, IRefreshToken } from '@/types/auth';
import { axiosNoAuthInstance } from '@/utils/axios';

export function login(address: string, signature: string, message: string) {
  return axiosNoAuthInstance.post<IAuth>('/auth/login', { address, signature, message });
}

export function getNonce(address: string) {
  return axiosNoAuthInstance.get('/auth/get-nonce/' + address);
}

export function refreshToken(refreshToken: string) {
  return axiosNoAuthInstance.post<IRefreshToken>('/auth/refresh-tokens', { refreshToken });
}
export function logout(refreshToken: string) {
  return axiosNoAuthInstance.post('/auth/logout', { refreshToken });
}
