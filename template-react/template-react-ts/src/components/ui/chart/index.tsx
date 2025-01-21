import { useEffect, useState } from 'react';
import styles from './index.module.less';
import { SpinCom } from '@/components/antd/index';
import EchartsContainer from '../echarts';
import type { EchartsContainerType } from '../echarts';

export interface ChartProps<R> {
  type: string;
  title?: React.ReactNode;
  echarts_option?: EchartsContainerType['echarts_option'];
  events?: EchartsContainerType['events'];
  queryDataAll?: (<T>(query: R) => Promise<request<T>>)[];
  queryParameters?: R;
  handleReturnedData?: <T>(data: T, key: string) => void;
}
export const ChartEcharts = <T,>(props: ChartProps<T>) => {
  const { type, title, queryDataAll, queryParameters, echarts_option, events, handleReturnedData } =
    props;

  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    if (Array.isArray(queryDataAll) && queryDataAll.length > 0) {
      setSpinning(true);
      Promise.all(
        queryDataAll.map((item, index) => {
          const query =
            queryParameters && Array.isArray(queryParameters)
              ? queryParameters[index]
              : queryParameters || {};
          return item({ ...query });
        }),
      ).then(res => {
        setSpinning(false);
        if (handleReturnedData) {
          handleReturnedData(res, type);
        }
      });
    }
  }, [queryDataAll, queryParameters, type, handleReturnedData]);
  return (
    <div className={styles.chart}>
      <div className={styles.chart_top}>{title}</div>

      <div className={styles.chart_conenter}>
        <SpinCom spin={{ spinning }}>
          <EchartsContainer echarts_option={{ ...echarts_option }} events={events} />
        </SpinCom>
      </div>
    </div>
  );
};
