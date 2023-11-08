import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './ColumnChart.css';

const ColumnChart: React.FC<{ data: any[] }> = ({ data }) => {

  const countryNames = data.reduce((acc, entry) => {
    if (!acc.includes(entry.country)) {
      acc.push(entry.country);
    }
    return acc;
  }, []);
  
  const visitorCounts = countryNames.map((country: string) => {
    const count = data.reduce((acc, entry) => {
      if (entry.country === country) {
        acc += parseInt(entry.adults) + parseInt(entry.children) + parseInt(entry.babies);
      }
      return acc;
    }, 0);
    return count;
  });

    const chartOptions = {
        chart: {
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: countryNames,
        },
        yaxis: {
          title: {
            text: 'Total Visitors',
          },
        },
        fill: {
          opacity: 1,
        },
      };

  return (
    <div className="column-chart">
      <h2>Column Chart</h2>
      <ReactApexChart options={chartOptions} series={[{ name: 'Visitors', data: visitorCounts }]} type="bar" height={350} />
    </div>
  );
};

export default ColumnChart;