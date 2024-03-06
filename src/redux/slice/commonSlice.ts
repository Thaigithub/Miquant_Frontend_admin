import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
  accountInfo: {
    name: string;
  };
}

const initialState: CommonState = {
  accountInfo: {
    name: '',
  },
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setAccountInfo: (state, action: PayloadAction<CommonState['accountInfo']>) => {
      state.accountInfo = action.payload;
    },
  },
});

const commonReducer = commonSlice.reducer;
export const { setAccountInfo } = commonSlice.actions;
export default commonReducer;
