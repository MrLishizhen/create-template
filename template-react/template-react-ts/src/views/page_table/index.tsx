// import styles from './index.module.less';
import { useState } from 'react';
import LayoutTable from '@/components/LayoutTable';
import { getTableData } from '@/api/page_table';
export interface TableData {
  name: string;
  id: string;
  age: number;
  address: string;
}

export interface SearchTypes {
  name: string;
  id: string;
  age: number;
  address: string;
}
const Page_Table = () => {
  const [params, setParams] = useState<SearchTypes>({ id: '', name: '', age: 0, address: '' });
  return (
    <LayoutTable<SearchTypes, TableData>
      requestDataFunction={getTableData}
      requestParams={params}
      TableContentProps={{}}
    />
  );
};

export default Page_Table;
