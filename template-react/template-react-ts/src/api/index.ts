import Axios from '@/utils/request';

export function getMenu() {
  return Axios({
    url: '/get_menu',
    method: 'POST',
    loading: true,
  });
}
