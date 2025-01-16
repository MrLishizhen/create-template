import Axios from '@/utils/request';
import { LoginProps } from '@/api/api';
export function login(data: LoginProps) {
  return Axios({
    url: '/login',
    method: 'POST',
    data: data,
    loading: true,
  });
}

//获取用户信息
export const getUserInfo = () => {
  return Axios({
    url: '/user/info',
    method: 'GET',
  });
};
