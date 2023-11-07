import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateSelector.css'; // Import your CSS file

interface DateSelectorProps {
  selectedDateRange: { start: Date; end: Date };
  onDateRangeChange: (range: { start: Date; end: Date }) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDateRange, onDateRangeChange }) => {
  const handleStartDateChange = (date: Date) => {
    onDateRangeChange({ start: date, end: selectedDateRange.end });
  };

  const handleEndDateChange = (date: Date) => {
    onDateRangeChange({ start: selectedDateRange.start, end: date });
  };

  return (
    <div className="date-selector">
      <h2>Date Range Selector</h2>
      <div className="date-picker">
        <label>Start Date:</label>
        <DatePicker
          selected={selectedDateRange.start}
          onChange={handleStartDateChange}
          selectsStart
          startDate={selectedDateRange.start}
          endDate={selectedDateRange.end}
        />
      </div>
      <div className="date-picker">
        <label>End Date:</label>
        <DatePicker
          selected={selectedDateRange.end}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={selectedDateRange.start}
          endDate={selectedDateRange.end}
          minDate={selectedDateRange.start}
        />
      </div>
    </div>
  );
};

export default DateSelector;
