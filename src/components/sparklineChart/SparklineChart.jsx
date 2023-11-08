import './SparklineChart.css';
import ReactApexChart from 'react-apexcharts';

const SparklineChart = ({ data, title }) => {

const visitorData = {};

// Iterate over the data and aggregate adult visitors by date
data.forEach((entry) => {
  const date = `${entry.arrival_date_year}-${entry.arrival_date_month}-${entry.arrival_date_day_of_month}`;
  let visitors = 0;
  title === "Total Adult Visitors" ? visitors = parseInt(entry.adults) : visitors = parseInt(entry.children);
  
  if (visitorData[date]) {
    visitorData[date] += visitors;
  } else {
    visitorData[date] = visitors;
  }
});

// Convert the aggregated data to an array
const visitorDataArray = Object.values(visitorData);


  const chartOptions = {
    chart: {
      type: 'line',
      sparkline: {
        enabled: true,
      },
      width: '100%',
      height: 40,
    },
    stroke: {
      curve: 'smooth',
    },
    tooltip: {
      enabled: false,
    },
  };

  return (
    <div className="sparkline-chart">
      <h4>{title}</h4>
      <ReactApexChart options={chartOptions} series={[{ data: visitorDataArray }]} type="line" height={40} />
    </div>
  );
};

export default SparklineChart;