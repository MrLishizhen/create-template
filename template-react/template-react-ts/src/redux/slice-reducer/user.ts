import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getUserInfo } from '@/api/login';
type UserProps = {
  user: {
    name: string;
    userId: string;
  } | null;
};

const initialState: UserProps = {
  user: null,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(handleUserInfo.fulfilled, (state, action) => {
      const res = action.payload;
      if (res?.code === 200) {
        state.user = res?.result;
      } else {
        state.user = null;
      }
    });
  },
});

export const handleUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (): Promise<request<UserProps['user']>> => {
    return getUserInfo();
  },
);
export const userState = (state: RootState) => state.userSlice.user;
export default userSlice.reducer;
