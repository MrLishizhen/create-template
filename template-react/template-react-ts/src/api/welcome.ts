import Axios from '@/utils/request';

export const getPieData = <T>(data: T) => {
  return Axios({
    url: '/get_pie_data',
    method: 'POST',
    data: data,
  });
};

export const getPieTitleTotal = <T>(data: T) => {
  return Axios({
    url: '/get_pie_data_total',
    method: 'post',
    data: data,
  });
};
