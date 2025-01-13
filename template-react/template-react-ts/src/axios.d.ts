import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    loading?: boolean; // 添加 loading 属性
  }
  //解决axios返回promise参数不对等的问题
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<request<T>>;
  }
}
