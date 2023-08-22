import React from 'react';
import Chart from 'react-apexcharts';
import { HiArrowUp } from 'react-icons/hi';

const VisitorChart = () => {
  // Generate x-axis categories for the last 7 days from the current date
  const currentDate = new Date();
  const categories = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - index);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  }).reverse();

  const options = {
    chart: {
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: ['#008FFB'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    colors: ['#0000FF'], // Change area color
    series: [
      {
        name: 'Visitors',
        data: [120, 220, 180, 250, 160, 190, 140], // Sample data for visitors
      },
    ],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: categories, // Use the dynamically generated categories
      labels: {
        show: false, // Hide x-axis labels
      },
    },
    yaxis: {
      labels: {
        show: false, // Hide y-axis labels
      },
    },
    tooltip: {
      enabled: true, // Show tooltip on hover
      style: {
        fontFamily: 'Jost, sans-serif', // Change tooltip font
        fontSize: '14px',
      },
      theme: 'dark', // Use 'dark' theme for tooltip
      marker: {
        show: true,
      },
      rounded: true, // Make the tooltip border rounded
    },
  };

  return (
    <div className="visitor-chart bg-white rounded-md w-1/3 p-8">
      <div className="statistic flex justify-between">
        <div className="visitors flex flex-col">
          <h1 className='text-4xl'>5,355</h1>
          <span className='text-gray-400'>Visitors this week</span>
        </div>
        <div className="visitor-percentage flex items-center gap-1 text-green-600">
          <span>32.9%</span>
          <HiArrowUp size={20} />
        </div>
      </div>
      <Chart type={options.chart.type} series={options.series} options={options} height="300" />
    </div>
  );
};

export default VisitorChart;
