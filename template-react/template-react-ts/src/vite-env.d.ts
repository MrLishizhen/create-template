/// <reference types="vite/client" />

interface request<T> {
  code: number;
  msg: string;
  result: T;
}
