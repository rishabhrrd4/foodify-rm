
import React, { useState, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { type  ApexOptions } from 'apexcharts';
import { type CuisineData } from './dashboardData';
import { ChevronDown } from 'lucide-react';

interface CuisineChartProps {
  data: CuisineData[];
  title: string;
}

type SortOption = 'orders-desc' | 'orders-asc' | 'revenue-desc' | 'revenue-asc' | 'name-asc' | 'name-desc';

const CuisineChart: React.FC<CuisineChartProps> = ({ data, title }) => {
  const [sortBy, setSortBy] = useState<SortOption>('orders-desc');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = [
    { value: 'orders-desc' as SortOption, label: 'Orders (High to Low)' },
    { value: 'orders-asc' as SortOption, label: 'Orders (Low to High)' },
    { value: 'revenue-desc' as SortOption, label: 'Revenue (High to Low)' },
    { value: 'revenue-asc' as SortOption, label: 'Revenue (Low to High)' },
    { value: 'name-asc' as SortOption, label: 'Name (A to Z)' },
    { value: 'name-desc' as SortOption, label: 'Name (Z to A)' }
  ];

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      switch (sortBy) {
        case 'orders-desc':
          return b.orders - a.orders;
        case 'orders-asc':
          return a.orders - b.orders;
        case 'revenue-desc':
          return b.revenue - a.revenue;
        case 'revenue-asc':
          return a.revenue - b.revenue;
        case 'name-asc':
          return a.cuisine.localeCompare(b.cuisine);
        case 'name-desc':
          return b.cuisine.localeCompare(a.cuisine);
        default:
          return 0;
      }
    });
    return sorted;
  }, [data, sortBy]);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    colors: ['#3B82F6', '#F59E0B'],
    xaxis: {
      categories: sortedData.map(item => item.cuisine),
      labels: {
        style: {
          colors: '#6B7280'
        }
      }
    },
    yaxis: [
      {
        title: {
          text: 'Orders',
          style: {
            color: '#3B82F6'
          }
        },
        labels: {
          style: {
            colors: '#3B82F6'
          }
        }
      },
      {
        opposite: true,
        title: {
          text: 'Revenue (₹)',
          style: {
            color: '#F59E0B'
          }
        },
        labels: {
          style: {
            colors: '#F59E0B'
          },
          formatter: (value: any) => `₹${value}`
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
      shared: true,
      intersect: false,
      y: [
        {
          formatter: (value: any) => `${value} orders`
        },
        {
          formatter: (value: any) => `₹${value.toLocaleString()}`
        }
      ]
    }
  };

  const series = [
    {
      name: 'Orders',
      type: 'column',
      data: sortedData.map(item => item.orders)
    },
    {
      name: 'Revenue',
      type: 'column',
      data: sortedData.map(item => item.revenue),
      yAxisIndex: 1
    }
  ];

  const selectedOption = sortOptions.find(option => option.value === sortBy);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-w-[180px]"
          >
            {selectedOption?.label}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      sortBy === option.value 
                        ? 'bg-orange-50 text-orange-900 font-medium' 
                        : 'text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Chart
        options={chartOptions}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default CuisineChart;
