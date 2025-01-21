import styles from './index.module.less';
import { useState } from 'react';

import { ChartEcharts } from '@/components/ui';
import type { ChartProps } from '@/components/ui';

import { getPieData, getPieTitleTotal } from '@/api/welcome';
type ChartEchartsR = {
  [key: string]: string | number | boolean;
};
interface ChartTypes extends ChartProps<ChartEchartsR> {
  type: string;
  style: React.CSSProperties;
}
const Welcome = () => {
  const handleReturnedData = (data, key: string) => {
    console.log(data, key);
  };

  const [chart, setChart] = useState<ChartTypes[]>([
    {
      type: 'fwly',
      style: { width: '100%', height: '416px' },
      queryDataAll: [getPieData, getPieTitleTotal],
      queryParameters: { type: '1' },
      echarts_option: {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
        ],
      },
    },
  ]);
  return (
    <div className={styles.home}>
      {chart.map(item => {
        return (
          <div className={styles.chart} key={item.type} style={{ ...(item?.style ?? {}) }}>
            <ChartEcharts
              type={item.type}
              handleReturnedData={handleReturnedData}
              queryParameters={item.queryParameters}
              queryDataAll={item.queryDataAll}
              title={'访问来源'}
              echarts_option={item.echarts_option}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Welcome;
