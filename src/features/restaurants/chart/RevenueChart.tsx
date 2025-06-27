import React from 'react';
import Chart from 'react-apexcharts';
import { type ApexOptions } from 'apexcharts';
import { type OrderData } from './dashboardData';
import TimeFilter, { type TimeFilterOption } from './TimeFilter';

interface RevenueChartProps {
  data: OrderData[];
  title: string;
  timeFilter: TimeFilterOption;
  onFilterChange: (filter: TimeFilterOption) => void;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ 
  data, 
  title,
  timeFilter,
  onFilterChange 
}) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        speed: 800
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#F97316', '#10B981'],
    xaxis: {
      categories: data.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('en', { 
          month: 'short', 
          day: 'numeric' 
        });
      }),
      labels: {
        style: {
          colors: '#6B7280'
        }
      }
    },
    yaxis: [
      {
        title: {
          text: 'Revenue (₹)',
          style: {
            color: '#F97316'
          }
        },
        labels: {
          style: {
            colors: '#F97316'
          },
          formatter: (value) => `₹${value.toLocaleString()}`
        }
      },
      {
        opposite: true,
        title: {
          text: 'Orders',
          style: {
            color: '#10B981'
          }
        },
        labels: {
          style: {
            colors: '#10B981'
          }
        }
      }
    ],
    legend: {
      position: 'top',
      horizontalAlign: 'right'
    },
    grid: {
      borderColor: '#F3F4F6'
    },
    tooltip: {
        enabled: true,
      shared: true,
      intersect: false,
      y: [
        {
          formatter: (value) => `₹${value.toLocaleString()}`
        },
        {
          formatter: (value) => `${value} orders`
        }
      ]
    }
  };

  const series = [
    {
      name: 'Revenue',
      type: 'area',
      data: data.map(item => item.revenue)
    },
    {
      name: 'Orders',
      type: 'area',
      data: data.map(item => item.orders),
      yAxisIndex: 1
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="w-40"> 
          <TimeFilter 
            selectedFilter={timeFilter} 
            onFilterChange={onFilterChange}
          />
        </div>
      </div>
      <Chart
        options={chartOptions}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default RevenueChart;