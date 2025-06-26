import React from 'react';
import Chart from 'react-apexcharts';
import { type ApexOptions } from 'apexcharts';
import { type  OrderStatusData } from './dashboardData';

interface OrderStatusChartProps {
  data: OrderStatusData[];
  title: string;
}

const OrderStatusChart: React.FC<OrderStatusChartProps> = ({ data, title }) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'pie',
      height: 350
    },
    labels: data.map(item => item.status),
    colors: data.map(item => item.color),
    legend: {
      position: 'bottom',
      horizontalAlign: 'center'
    },
    tooltip: {
      y: {
        formatter: (value:any, {  }) => {
          const total = data.reduce((sum, item) => sum + item.count, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${value} orders (${percentage}%)`;
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`
    }
  };

  const series = data.map(item => item.count);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <Chart
        options={chartOptions}
        series={series}
        type="pie"
        height={350}
      />
    </div>
  );
};

export default OrderStatusChart;