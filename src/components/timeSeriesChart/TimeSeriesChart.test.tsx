import { render, screen } from "@testing-library/react";
import TimeSeriesChart from "./TimeSeriesChart";

const sampleData: [
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
  ] = [
  {
    adults: "1",
    arrival_date_day_of_month: "5",
    arrival_date_month: "July",
    arrival_date_year: "2015",
    babies: "0",
    children: "0",
    country: "GBR",
    hotel: "Resort Hotel",
    __v: 0,
    _id: "1",
  }
];

describe("TimeSeriesChart Component", () => {
  it("should render the chart with the correct title", () => {
    render(<TimeSeriesChart entries={sampleData} />);
    const chartTitle = screen.getByText("Sample Time Series Chart");
    expect(chartTitle).toBeInTheDocument();
  });

  it("should render the time series chart", () => {
    render(<TimeSeriesChart entries={sampleData} />);
    const timeSeriesChart = screen.getByTestId("time-series-chart");
    expect(timeSeriesChart).toBeInTheDocument();
  });
});
