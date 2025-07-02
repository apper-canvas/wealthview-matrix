import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';

const PerformanceChart = ({ performanceData = [] }) => {
  const [timeframe, setTimeframe] = useState('1M');

  const timeframes = [
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1Y', value: '1Y' },
    { label: 'ALL', value: 'ALL' }
  ];

  const filterDataByTimeframe = () => {
    if (!performanceData.length) return [];
    
    const now = new Date();
    let startDate = new Date();
    
    switch (timeframe) {
      case '1W':
        startDate.setDate(now.getDate() - 7);
        break;
      case '1M':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3M':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6M':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1Y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return performanceData;
    }
    
    return performanceData.filter(item => new Date(item.date) >= startDate);
  };

  const filteredData = filterDataByTimeframe();

  const chartOptions = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    colors: ['#1a5f3f', '#48bb78'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false
        }
      }
    },
    xaxis: {
      type: 'datetime',
      categories: filteredData.map(item => item.date),
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          colors: '#718096'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          colors: '#718096'
        },
        formatter: (val) => {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(val);
        }
      }
    },
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif'
      },
      x: {
        format: 'MMM dd, yyyy'
      },
      y: {
        formatter: (val) => {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(val);
        }
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      markers: {
        width: 12,
        height: 12,
        radius: 6
      }
    }
  };

  const series = [
    {
      name: 'Portfolio Value',
      data: filteredData.map(item => item.value)
    }
  ];

  return (
    <Card>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display font-semibold text-secondary-800">
            Performance
          </h3>
          <div className="flex space-x-1">
            {timeframes.map((tf) => (
              <Button
                key={tf.value}
                variant={timeframe === tf.value ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTimeframe(tf.value)}
                className="min-w-0"
              >
                {tf.label}
              </Button>
            ))}
          </div>
        </div>
        
        {filteredData.length > 0 ? (
          <Chart
            options={chartOptions}
            series={series}
            type="area"
            height={350}
          />
        ) : (
          <div className="h-80 flex items-center justify-center text-secondary-500">
            <div className="text-center">
              <p className="text-lg font-medium">No performance data</p>
              <p className="text-sm">Performance data will appear as your portfolio grows</p>
            </div>
          </div>
        )}
      </motion.div>
    </Card>
  );
};

export default PerformanceChart;