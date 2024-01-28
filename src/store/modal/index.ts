import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ModalState {
  wallet: boolean;
}

// Define the initial state using that type
const initialState: ModalState = {
  wallet: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalWallet: (state, action: PayloadAction<boolean>) => {
      state.wallet = action.payload;
    },
  },
});

export const { setModalWallet } = modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const useSelectModal = () => useSelector((state: RootState) => state.modal);

export const useChangeModal = () => {
  const dispatch = useAppDispatch();

  const setWallet = (visible: boolean) => {
    dispatch(setModalWallet(visible));
  };

  return { setWallet };
};

export default modalSlice.reducer;
