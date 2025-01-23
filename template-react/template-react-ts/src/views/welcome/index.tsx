import styles from './index.module.less';
import { useState } from 'react';

import { ChartEcharts } from '@/components/ui';
import type { ChartProps } from '@/components/ui';

import { getPieData, getPieTitleTotal } from '@/api/welcome';

interface ChartTypes extends ChartProps {
  type: string;
  style: React.CSSProperties;
}
const Welcome = () => {
  // 定义 handleReturnedData 函数，使用泛型 T
  const handleReturnedData: <T>(data: T[], key: string) => void = (data, key) => {
    // 处理返回的数据
    if (key === 'fwly') {
      data.map(item => {
        const chartOptions = chart.find(u => u.type === key);
        if (Array.isArray(item)) {
          if (chartOptions) {
            const { echarts_option } = chartOptions;
            if (Array.isArray(echarts_option.series)) {
              echarts_option.series[0].data = item;
            }
          }
        } else {
          if (chartOptions) {
            const { echarts_option } = chartOptions;
            const { title } = echarts_option;
            if (title && typeof title === 'object' && 'text' in title) {
              title.text = (item as { total: number }).total.toString();
            }
          }
        }
      });
      setChart([...chart]);
    }
  };

  const [chart, setChart] = useState<ChartTypes[]>([
    {
      type: 'fwly',
      style: { width: '100%', height: '416px' },
      queryDataAll: [getPieData, getPieTitleTotal],
      queryParameters: { type: '1' },
      echarts_option: {
        title: {
          text: '',
        },
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
