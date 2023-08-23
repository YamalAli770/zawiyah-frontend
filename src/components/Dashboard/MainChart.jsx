import React from 'react';
import { HiArrowUp } from 'react-icons/hi';
import Chart from 'react-apexcharts';

const MainChart = () => {
  const currentDate = new Date();
  const categories = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - index);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  }).reverse();

  const options = {
    chart: {
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 4,
      colors: ['#008FFB'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7
      }
    },
    colors: ['#FFB52E', '#0000FF'],
    series: [
      {
        name: 'Revenue',
        data: [45, 52, 38, 45, 19, 23, 2],
      },
      {
        name: 'Revenue (Previous Period)',
        data: [30, 40, 28, 35, 20, 10, 5]
      }
    ],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: categories, // Use the dynamically generated categories
      labels: {
        style: {
            fontFamily: 'Jost, sans-serif',
        }
      }
    },
    yaxis: {
        labels: {
          style: {
              fontFamily: 'Jost, sans-serif',
          }
        }
    },
    tooltip: {
        x: {
          format: 'dd MMM',
        },
        style: {
          fontFamily: 'Jost, sans-serif', // Change tooltip font
          fontSize: '14px',
        },
        theme: 'dark', // Use 'dark' theme for tooltip
        marker: {
          show: true
        },
        rounded: true, // Make the tooltip border rounded
      },
    legend: {
      fontFamily: 'Jost, sans-serif', // Change series name font
      fontSize: '16px',
      marginTop: '20px',
    }
  };

  return (
    <div className='main-chart flex flex-col'>
      <div className="statistic flex justify-between">
        <div className="sales flex flex-col">
          <h1 className='text-4xl'>$45,385</h1>
          <span className='text-gray-400'>Sales this week</span>
        </div>
        <div className="sales-percentage flex items-center gap-1 text-green-600">
          <span>12.5%</span>
          <HiArrowUp size={20} />
        </div>
      </div>
      <div className="graph h-96">
        <Chart type={options.chart.type} series={options.series} options={options} height='100%' />
      </div>
    </div>
  );
}

export default MainChart;
