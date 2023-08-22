import React from 'react';
import Chart from 'react-apexcharts';
import { HiArrowUp, HiArrowDown } from 'react-icons/hi';

const UsersJoinedChart = () => {
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
      name: 'Users Joined',
      data: [12, 20, 18, 15, 9, 13, 4], // Replace with actual data
    },
  ];

  return (
    <div className="graph bg-white w-1/3 rounded-md p-8">
      <div className="statistic flex justify-between">
        <div className="user-signups flex flex-col">
          <h1 className='text-4xl'>385</h1>
          <span className='text-gray-400'>User signups this week</span>
        </div>
        <div className="signups-percentage flex items-center gap-1 text-red-600">
          <span>-2.7%</span>
          <HiArrowDown size={20} />
        </div>
      </div>
      <Chart type={options.chart.type} series={series} options={options} height="300" />
    </div>
  );
};

export default UsersJoinedChart;
