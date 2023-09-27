import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DateSelector = ({ selectedDate, onChange }) => {
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const tileDisabled = ({ date }) => {
    const currentDate = new Date();
    return isWeekend(date) || date < currentDate;
  };

  const handleDateChange = (date) => {
    onChange(date);
  };

  return (
    <div className="calendar-container w-1/2 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        calendarType="US"
        tileDisabled={tileDisabled}
        minDate={new Date()}
        maxDetail="month"
        minDetail="month"
      />
    </div>
  );
};

DateSelector.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateSelector;
