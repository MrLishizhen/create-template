import { createSlice } from '@reduxjs/toolkit';
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
  routes: [
    {
      id: 1,
      parentId: 0,
      name: 'home',
      link: 'home',
      meta: {
        title: '首页',
      },
    },
  ],
};
export const routesSlice = createSlice({
  name: 'menu',
  initialState: initialState,
  reducers: {},
});

// export const routes = (state: RootState) => state.routesSlice.routes;

export default routesSlice.reducer;
