import React from 'react';
import Chart from 'react-apexcharts';
import { HiArrowUp } from 'react-icons/hi';

const ProductChart = () => {
  // Generate x-axis categories for the last 7 days from the current date
  const currentDate = new Date();
  const categories = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - index);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  }).reverse();

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories, // Use the dynamically generated categories
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false, // Hide y-axis labels
      },
    },
    colors: ['#008FFB'],
    legend: {
      show: false,
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
        show: true,
      },
      rounded: true, // Make the tooltip border rounded
    },
  };

  const series = [
    {
      name: 'Products Listed',
      data: [12, 20, 18, 15, 9, 13, 4], // Replace with actual data
    },
  ];

  return (
    <div className="product-chart bg-white rounded-md w-1/3 p-8">
      <div className="statistic flex justify-between">
        <div className="products-isted flex flex-col">
          <h1 className='text-4xl'>2,340</h1>
          <span className='text-gray-400'>New products this week</span>
        </div>
        <div className="product-percentage flex items-center gap-1 text-green-600">
          <span>14.6%</span>
          <HiArrowUp size={20} />
        </div>
      </div>
      <Chart type={options.chart.type} series={series} options={options} height="300" />
    </div>
  );
};

export default ProductChart;
