import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCoinHistory } from '../util/api';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../util/atoms';

export interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const coinId = useOutletContext<string>();
  const { data, isLoading } = useQuery<IHistorical[]>({
    queryKey: ['ohlcv', coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });

  const candlestickData = data?.map((item) => {
    return {
      x: new Date(item.time_close * 1000),
      y: [item.open, item.high, item.low, item.close].map(Number),
    };
  });

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: 'sales',
              data: candlestickData!,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: 'smooth',
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false, datetimeFormatter: { month: "mm 'yy" } },
              type: 'datetime',
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toUTCString(),
              ),
            },
            fill: {
              type: 'gradient',
              gradient: {
                gradientToColors: ['#fff3ef'],
                stops: [0, 100],
              },
            },
            colors: ['#0fbcf9'],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#0618c5',
                  downward: '#c50404',
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
