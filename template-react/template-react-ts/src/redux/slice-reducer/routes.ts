import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMenu } from '@/api/index';

// import type { RootState } from '../store';
export type RoutesType = {
  id: number;
  parentId: number;
  name: string;
  link: string;
  meta: {
    title: string;
  };
};

const initialState: { routes: RoutesType[] } = {
  routes: [],
};
export const routesSlice = createSlice({
  name: 'menu',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMenuList.fulfilled, (state, action) => {
      const res = action.payload;
      if (res?.code === 200) {
        state.routes = res?.result;
      } else {
        state.routes = [];
      }
    });
  },
});

export const getMenuList = createAsyncThunk(
  'menu/getMenu',
  async (data: user_menu): Promise<request<RoutesType[]>> => {
    return await getMenu(data);
  },
);

// export const routes = (state: RootState) => state.routesSlice.routes;

export default routesSlice.reducer;
