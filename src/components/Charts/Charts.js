import React from 'react';
import Chart from 'react-apexcharts';

const PieChart = () => {
  // Sample data for the pie chart
  const chartData = {
    series: [44, 55, 44],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C'],
      colors: ['#e31e24', '#1aa4d9', '#31af4e'], // Specify colors for Team A, B, and C

    },
  };

  return (
    <div className="col-sm-12 col-md-6 mb-4">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        width={380}
      />
    </div>
  );
};

export default PieChart;
