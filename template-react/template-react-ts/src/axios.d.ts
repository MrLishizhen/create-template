import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    loading?: boolean; // 添加 loading 属性
  }
}
