import React from "react";
import ReactApexChart from "react-apexcharts";
import "./TimeSeriesChart.css";

interface TimeSeriesChartProps {
  entries: [
    {
      adults: string;
      arrival_date_day_of_month: string;
      arrival_date_month: string;
      arrival_date_year: string;
      babies: string;
      children: string;
      country: string;
      hotel: string;
      __v: number;
      _id: string;
    }
  ];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ entries }) => {
  // Sample data (replace with your actual data)
  const chartData = entries
    .reduce(
      (result, item) => {
        const { arrival_date_day_of_month, arrival_date_month, arrival_date_year } = item;
        const date = `${arrival_date_year}-${arrival_date_month}-${arrival_date_day_of_month}`;
        const totalPersons = parseInt(item.adults) + parseInt(item.children) + parseInt(item.babies);

        const existingEntry = result.find((entry) => entry.date === date);
        if (existingEntry) {
          existingEntry.totalPersons += totalPersons;
        } else {
          result.push({ date, totalPersons });
        }

        return result;
      },
      [{ date: "", totalPersons: 0 }]
    )
    .map((dataPoint) => {
      if (dataPoint.date !== "")
        return {
          x: dataPoint.date,
          y: dataPoint.totalPersons,
        };

      return { x: "", y: 0 };
    })
    .filter((dataPoint) => dataPoint.x !== "" && dataPoint.y !== 0);
    
  // Chart options
  const chartOptions = {
    hart: {
      type: "line", // Change this to 'line' for a line chart
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Number of visitors per day",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val.toFixed(0);
        },
      },
      title: {
        text: "Number",
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val: number) {
          return val.toFixed(0);
        },
      },
    },
  };

  return (
    <div className="time-series-chart">
      <h2>Time Series Chart</h2>
      <ReactApexChart options={chartOptions} series={[{ data: chartData }]} type="line" height={350} />
    </div>
  );
};

export default TimeSeriesChart;
