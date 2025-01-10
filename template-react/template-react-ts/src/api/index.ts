import Axios from '@/utils/request';

interface user_menu {
  userName: string;
}

export function getMenu(data: user_menu) {
  return Axios({
    url: '/get_menu',
    method: 'POST',
    data: data,
    loading: true,
  });
}
