import Axios from '@/utils/request';
import { RequestFunction, QueryResultData } from '@/components/LayoutTable';

import type { SearchTypes, TableData } from '@/views/page_table/index';

export const getTableData: RequestFunction<SearchTypes, QueryResultData<TableData>> = data => {
  return Axios({
    url: '/get_table_data',
    method: 'POST',
    data: data,
  });
};
