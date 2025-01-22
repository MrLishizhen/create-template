import { useEffect, useState } from 'react';
import { message } from 'antd';
import styles from './index.module.less';
import { SpinCom } from '@/components/antd/index';
import EchartsContainer from '../echarts';
import type { EchartsContainerType } from '../echarts';
export type QueryFunction<R, T> = (query: R) => Promise<request<T>>;

export interface ChartProps<R = any, T = any> {
  type: string;
  title?: React.ReactNode;
  echarts_option: EchartsContainerType['echarts_option'];
  events?: EchartsContainerType['events'];
  queryDataAll?: QueryFunction<R, T>[];
  queryParameters?: R | R[];
  handleReturnedData?: (data: T[], key: string) => void;
}
export const ChartEcharts = <R, T>(props: ChartProps<R, T>) => {
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
              : queryParameters || ({} as R);
          return item({ ...query });
        }),
      ).then(res => {
        setSpinning(false);

        if (handleReturnedData) {
          const data = res
            .map(item => {
              if (item.code === 200) {
                return item.result;
              }
              message.error(item.msg);
              return undefined;
            })
            .filter((item): item is T => item !== undefined);
          handleReturnedData(data, type);
        }
      });
    }
  }, [queryDataAll, queryParameters, type]);
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
