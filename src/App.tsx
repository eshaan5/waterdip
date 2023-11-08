import { useEffect, useState } from "react";
import DateSelector from "./components/dateSelector/DateSelector";
import TimeSeriesChart from "./components/timeSeriesChart/TimeSeriesChart";
import axios from "axios";
import ColumnChart from "./components/columnChart/ColumnChart";
import SparklineChart from "./components/sparklineChart/SparklineChart";

const API = axios.create({ baseURL: "https://waterdip-data.vercel.app/entries" });

function App() {
  const [selectedDateRange, setSelectedDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date("2015-07-01"),
    end: new Date("2015-07-01"),
  });

  const [entries, setEntries] = useState<
    [
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
    ]
  >([
    {
      adults: "",
      arrival_date_day_of_month: "",
      arrival_date_month: "",
      arrival_date_year: "",
      babies: "",
      children: "",
      country: "",
      hotel: "",
      __v: 0,
      _id: "",
    },
  ]);
  const [filteredEntries, setFilteredEntries] = useState(entries);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data } = await API.get("/");
      setEntries(data);
    };

    fetchEntries();
  }, []);

  useEffect(() => {
    const res = entries.filter((entry) => {
      const entryDate = new Date(`${entry.arrival_date_year}-${entry.arrival_date_month}-${entry.arrival_date_day_of_month}`);
      const startTime = new Date(selectedDateRange.start);
      const endTime = new Date(selectedDateRange.end);

      // Set the time component of the start and end date to ensure that
      // the comparison includes the entire day
      startTime.setHours(0, 0, 0, 0);
      endTime.setHours(23, 59, 59, 999);
      return entryDate >= startTime && entryDate <= endTime;
    });

    // Update the 'entries' state with the filtered entries
    setFilteredEntries(res as typeof entries);
  }, [selectedDateRange, entries]);

  return (
    <div className="App">
      <h1>Dashboard App</h1>
      <DateSelector selectedDateRange={selectedDateRange} onDateRangeChange={setSelectedDateRange} />
      <TimeSeriesChart entries={filteredEntries} />
      <ColumnChart data={filteredEntries} />
      <SparklineChart data={filteredEntries} title="Total Adult Visitors" />
      <SparklineChart data={filteredEntries} title="Total Children Visitors" />
    </div>
  );
}

export default App;
