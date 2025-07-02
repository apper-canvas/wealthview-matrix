import React from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import Card from '@/components/atoms/Card';

const AllocationChart = ({ holdings = [] }) => {
  const prepareChartData = () => {
    const assetAllocation = holdings.reduce((acc, holding) => {
      const key = holding.assetClass || 'Other';
      acc[key] = (acc[key] || 0) + holding.marketValue;
      return acc;
    }, {});

    return {
      series: Object.values(assetAllocation),
      labels: Object.keys(assetAllocation)
    };
  };

  const { series, labels } = prepareChartData();

  const chartOptions = {
    chart: {
      type: 'donut',
      height: 350,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#1a5f3f', '#48bb78', '#2f855a', '#68d391', '#38a169', '#22c55e'],
    labels: labels,
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              color: '#2d3748'
            },
            value: {
              show: true,
              fontSize: '24px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 700,
              color: '#1a5f3f',
              formatter: (val) => {
                return new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(val);
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total Value',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              color: '#718096'
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif'
      },
      y: {
        formatter: (val) => {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(val);
        }
      }
    }
  };

  if (series.length === 0) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center text-secondary-500">
          <p className="text-lg font-medium">No allocation data</p>
          <p className="text-sm">Add holdings to see portfolio allocation</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-display font-semibold text-secondary-800 mb-6">
          Asset Allocation
        </h3>
        <Chart
          options={chartOptions}
          series={series}
          type="donut"
          height={350}
        />
      </motion.div>
    </Card>
  );
};

export default AllocationChart;