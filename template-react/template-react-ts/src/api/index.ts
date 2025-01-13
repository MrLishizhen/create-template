import Axios from '@/utils/request';

export function getMenu(data: user_menu) {
  return Axios({
    url: '/get_menu',
    method: 'POST',
    data: data,
    loading: true,
  });
}
