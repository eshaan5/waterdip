import React, { useState } from "react";
import "./App.css";
import DateSelector from "./components/dateSelector/DateSelector";

function App() {
  const [selectedDateRange, setSelectedDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date("2015-07-01"),
    end: new Date("2015-07-01"),
  });

  console.log(selectedDateRange);
  return (
    <div className="App">
      <h1>React Date Range Selector</h1>
      <DateSelector selectedDateRange={selectedDateRange} onDateRangeChange={setSelectedDateRange} />
    </div>
  );
}

export default App;
