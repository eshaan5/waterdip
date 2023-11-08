import { render, screen } from "@testing-library/react";
import ColumnChart from "./ColumnChart";

const sampleData = [
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
  },
  {
    adults: "2",
    arrival_date_day_of_month: "5",
    arrival_date_month: "July",
    arrival_date_year: "2015",
    babies: "0",
    children: "0",
    country: "GBR",
    hotel: "City Hotel",
    __v: 0,
    _id: "2",
  },
];

describe("ColumnChart Component", () => {
  it("should render the chart with the correct title", () => {
    render(<ColumnChart data={sampleData} />);
    const chartTitle = screen.getByText("Sample Column Chart");
    expect(chartTitle).toBeInTheDocument();
  });

  it("should render the column chart", () => {
    render(<ColumnChart data={sampleData} />);
    const columnChart = screen.getByTestId("column-chart");
    expect(columnChart).toBeInTheDocument();
  });
});
