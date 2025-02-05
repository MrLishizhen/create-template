// import styles from './index.module.less';
import { useState } from 'react';
import LayoutTable from '@/components/LayoutTable';
import { getTableData } from '@/api/page_table';
import { Search } from '@/components/ui';
import type { Fields } from '@/components/ui';
import { Form } from 'antd';
export interface TableData {
  name: string;
  key: string;
  age: number;
  address: string;
}

export interface SearchTypes {
  name: string;
  key: string;
  age: number;
  address: string;
}

interface HeaderFormValue {
  name: string;
}
interface HeaderFormProps {
  buttonClick: (val: HeaderFormValue) => void;
}

const HeaderForm = (props: HeaderFormProps) => {
  const { buttonClick } = props;
  const [form] = Form.useForm();
  const fields: Fields[] = [
    {
      label: '姓名',
      widget: 'input',
      colSpan: 1,
      widgetItemProps: {
        name: 'name',
      },
      widgetProps: {
        placeholder: '请输入姓名',
      },
    },
    {
      label: '搜索',
      widget: 'button',
      colSpan: 1,
      widgetProps: {
        type: 'primary',
        onClick: () => {
          const value = form.getFieldsValue();
          buttonClick(value);
        },
      },
    },
  ];
  return <Search col={4} formProps={{ form }} fields={[...fields]} />;
};
const Page_Table = () => {
  const [params, setParams] = useState<HeaderFormValue>({
    name: '',
  });
  const buttonClick = (val: HeaderFormValue) => {
    setParams({ ...val });
  };
  return (
    <LayoutTable<SearchTypes, TableData>
      requestDataFunction={getTableData}
      requestParams={params}
      headerProps={{
        headerChildren: <HeaderForm buttonClick={buttonClick} />,
      }}
      TableContentProps={{
        columns: [
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
          },
        ],
      }}
    />
  );
};

export default Page_Table;
