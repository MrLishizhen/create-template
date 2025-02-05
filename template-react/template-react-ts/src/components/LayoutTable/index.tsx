import styles from './index.module.less';
import { ReactNode, useEffect, useState, useLayoutEffect, useRef } from 'react';
import { Table, Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import type { TableProps, PaginationProps } from 'antd';

export type RequestFunction<R, T> = (query: R) => Promise<request<T>>;
interface LayoutTableProps<R, T> {
  layoutControl?: {
    headShow?: boolean;
    beforeShow?: boolean;
    afterShow?: boolean;
    paginationShow?: boolean;
  };
  headerProps?: {
    headerChildren?: ReactNode;
  };
  TableContentProps: TableProps;
  requestDataFunction?: RequestFunction<R, T>;
  requestParams?: Partial<R>;
}

export interface QueryResultData<T> {
  result: T[];
  total: number;
}
/**
 * 布局表格
 */
const LayoutTable = <R, T extends object>(props: LayoutTableProps<R, QueryResultData<T>>) => {
  const {
    headerProps = {},
    layoutControl = {},
    TableContentProps = {},
    requestDataFunction,
    requestParams,
  } = props;
  const {
    headShow = true,
    beforeShow = false,
    afterShow = false,
    paginationShow = true,
  } = layoutControl;
  const { headerChildren } = headerProps;

  const { columns = [], dataSource: tableDataSource = [], pagination, ...rest } = TableContentProps;
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<{ page: number; pageSize: number }>({
    page: 1,
    pageSize: 10,
  });
  const [dataSource, setDataSource] = useState<readonly T[]>([...tableDataSource]);
  const requestData = () => {
    if (requestDataFunction) {
      setLoading(true);
      requestDataFunction({ ...(requestParams as R), ...page }).then(res => {
        if (res?.code === 200) {
          const { result: data, total } = res.result;

          if (Array.isArray(data)) {
            setDataSource(data);
            setTotal(total);
          } else {
            setDataSource([]);
            setTotal(0);
          }
        } else {
          setDataSource([]);
          setTotal(0);
        }
        setLoading(false);
      });
    }
  };

  const pageChange: PaginationProps['onChange'] = (page, pageSize) => {
    setPage({ page, pageSize });
  };

  useEffect(() => {
    requestData();
  }, [page, requestParams]);

  const table_ref = useRef<HTMLDivElement>(null);
  const table_body_ref = useRef<HTMLDivElement>(null);
  const table_header_ref = useRef<HTMLDivElement>(null);
  const table_footer_ref = useRef<HTMLDivElement>(null);
  const table_before_ref = useRef<HTMLDivElement>(null);
  const table_after_ref = useRef<HTMLDivElement>(null);
  const [table_body_number, set_table_body_number] = useState<number>(0);
  useLayoutEffect(() => {
    if (table_ref.current) {
      let body_height = table_ref.current.getBoundingClientRect().height;
      const ant_table_header =
        (table_ref.current.querySelector('.ant-table-header') as HTMLDivElement)?.offsetHeight || 0;
      if (ant_table_header) {
        body_height -= ant_table_header;
      }
      if (table_header_ref.current) {
        const { height: header } = table_header_ref.current.getBoundingClientRect();
        body_height -= header;
      }
      if (table_footer_ref.current) {
        const { height: footer } = table_footer_ref.current.getBoundingClientRect();
        body_height -= footer;
      }
      if (table_before_ref.current) {
        const { height: before } = table_before_ref.current.getBoundingClientRect();
        body_height -= before;
      }
      if (table_after_ref.current) {
        const { height: after } = table_after_ref.current.getBoundingClientRect();
        body_height -= after;
      }
      set_table_body_number(body_height);
    }
  }, []);
  return (
    <div className={styles.layout_table} ref={table_ref}>
      {headShow && (
        <div className={styles.layout_table_header} ref={table_header_ref}>
          {headerChildren}
        </div>
      )}
      {beforeShow && <div className={styles.before_table} ref={table_before_ref}></div>}
      <div className={styles.layout_table_body} ref={table_body_ref}>
        <Table
          loading={{ indicator: <LoadingOutlined spin />, spinning: loading }}
          columns={columns}
          dataSource={dataSource || []}
          pagination={paginationShow ? false : pagination}
          scroll={{ y: table_body_number }}
          {...rest}
        />
      </div>
      {afterShow && <div className={styles.after_table} ref={table_after_ref}></div>}

      {paginationShow ? (
        <div className={styles.layout_table_footer} ref={table_footer_ref}>
          <Pagination hideOnSinglePage={true} onChange={pageChange} showSizeChanger total={total} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default LayoutTable;
