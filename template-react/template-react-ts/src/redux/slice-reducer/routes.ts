import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMenu } from '@/api/index';

// import type { RootState } from '../store';
export type RoutesType = {
  id: number;
  parentId: number;
  name: string;
  link: string;
  icon?: string;
  meta: {
    title: string;
    hideMenu?: boolean;
    parentMenu?: string;
  };
};

const initialState: { routes: RoutesType[]; init: boolean; initPath: string } = {
  routes: [],
  init: true,
  initPath: '',
};
export const routesSlice = createSlice({
  name: 'menu',
  initialState: initialState,
  reducers: {
    setInit(state, action) {
      state.init = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getMenuList.fulfilled, (state, action) => {
      const res = action.payload;
      state.init = false;
      if (res?.code === 200) {
        state.routes = res?.result;
      } else {
        state.routes = [];
      }
    });
  },
});

export const { setInit } = routesSlice.actions;

export const getMenuList = createAsyncThunk(
  'menu/getMenu',
  async (): Promise<request<RoutesType[]>> => {
    return await getMenu();
  },
);

// export const routes = (state: RootState) => state.routesSlice.routes;

export default routesSlice.reducer;
