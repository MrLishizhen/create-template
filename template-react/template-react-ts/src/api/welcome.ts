import Axios from '@/utils/request';
import { QueryFunction } from '@/components/ui/chart';

interface PieDataTypes {
  type: string;
}
export const getPieData: QueryFunction<
  PieDataTypes,
  request<{ name: string; value: number }[]>
> = data => {
  return Axios({
    url: '/get_pie_data',
    method: 'POST',
    data: data,
  });
};

export const getPieTitleTotal: QueryFunction<PieDataTypes, request<{ total: number }>> = data => {
  return Axios({
    url: '/get_pie_data_total',
    method: 'post',
    data: data,
  });
};
