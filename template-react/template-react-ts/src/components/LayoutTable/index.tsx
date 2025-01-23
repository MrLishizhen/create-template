import styles from './index.module.less';
import { ReactNode, useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

export type RequestFunction<R, T> = (query: R) => Promise<request<T>>;
interface LayoutTableProps<R, T> {
  layoutControl?: {
    headShow?: boolean;
    beforeShow?: boolean;
    afterShow?: boolean;
  };
  headerProps?: {
    headerChildren?: ReactNode;
  };
  TableContentProps: TableProps;
  requestDataFunction?: RequestFunction<R, T>;
  requestParams?: R;
}

export interface QueryResultData<T> {
  result: T[];
  total: number;
}
/**
 * 布局表格
 */
const LayoutTable = <R, T>(props: LayoutTableProps<R, QueryResultData<T>>) => {
  const {
    headerProps = {},
    layoutControl = {},
    TableContentProps = {},
    requestDataFunction,
    requestParams,
  } = props;
  const { headShow = true, beforeShow = false, afterShow = false } = layoutControl;
  const { headerChildren } = headerProps;

  const { columns = [], dataSource: tableDataSource = [] } = TableContentProps;

  const [total, setTotal] = useState(0);
  const [dataSource, setDataSource] = useState<T[]>([...tableDataSource]);
  const requestData = () => {
    if (requestDataFunction) {
      requestDataFunction(requestParams as R).then(res => {
        if (res.code === 200) {
          if (Array.isArray(res.result)) {
            const { result, total } = res.result;
            setDataSource(result);
            setTotal(total);
          }
        }
      });
    }
  };

  useEffect(() => {
    requestData();
  }, []);

  return (
    <div className={styles.layout_table}>
      {headShow && <div className={styles.layout_table_header}>{headerChildren}</div>}
      {beforeShow && <div className={styles.before_table}></div>}
      <div className={styles.layout_table_body}>
        <Table columns={columns} dataSource={dataSource || []} {...TableContentProps} />
      </div>
      {afterShow && <div className={styles.after_table}></div>}
      <div className={styles.layout_table_footer}></div>
    </div>
  );
};

export default LayoutTable;
