import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/store';
import { ITokens, IUser } from '@/types/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UserState {
  userInfo: IUser | null;
  tokens: ITokens | null;
}

// Define the initial state using that type
const initialState: UserState = {
  userInfo: null,
  tokens: null,
};

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userInfo = action.payload.userInfo;
      state.tokens = action.payload.tokens;
    },
    resetUser: (state) => {
      state.userInfo = null;
      state.tokens = null;
    },
    setTokens: (state, action: PayloadAction<ITokens | null>) => {
      state.tokens = action.payload;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const useUserSelector = () => useSelector((state: RootState) => state.user);
export const useUserAction = () => {
  const { setUser, resetUser: resetUserAction } = userSlide.actions;
  const dispatch = useAppDispatch();

  const setUserInfo = (user: UserState) => {
    dispatch(setUser(user));
  };

  const resetUser = () => {
    dispatch(resetUserAction());
  };
  return { setUserInfo, resetUser };
};

export default userSlide.reducer;
