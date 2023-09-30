import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
const TimeSelector = ({ selectedTime, doctor, onChange }) => {
  const [availableTimes, setAvailableTimes] = useState([]);

  const convertTo24HourFormat = (time) => {
    if (!time) {
      return '';
    }
    const [hours, minutes] = time.split(':').map(Number);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  useEffect(() => {
    const generateAvailableTimes = () => {
      const times = [];
      if (doctor && doctor.time_available_from && doctor.time_available_to) {
        const timeAvailableFrom = dayjs.utc(doctor.time_available_from);
        const timeAvailableTo = dayjs.utc(doctor.time_available_to);
        const { appointments } = doctor;
        let currentTime = timeAvailableFrom;
        while (currentTime.isBefore(timeAvailableTo)) {
          const formattedTime = currentTime.format('HH:mm');
          const appointmentTimes = appointments.map((appointment) => dayjs.utc(appointment.appointment_time).format('HH:mm'));
          if (!appointmentTimes.includes(formattedTime)) {
            times.push(formattedTime);
          }
          currentTime = currentTime.add(30, 'minute');
        }
      }
      return times;
    };

    const times = generateAvailableTimes();
    setAvailableTimes(times);
  }, [doctor]);

  const handleTimeChange = (e) => {
    const selectedTimeIn24HourFormat = convertTo24HourFormat(e.target.value);
    onChange(selectedTimeIn24HourFormat);
  };

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row">
      <label htmlFor="hour-select"> Choose the time:</label>
      <select
        value={selectedTime}
        onChange={handleTimeChange}
        id="hour-select"
        className="p-2 border border-gray-300 rounded-md"
        defaultValue={selectedTime}
      >
        <option value="">Select a time</option>
        {availableTimes.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

TimeSelector.propTypes = {
  selectedTime: PropTypes.string.isRequired,
  doctor: PropTypes.shape({
    time_available_from: PropTypes.string.isRequired,
    time_available_to: PropTypes.string.isRequired,
    appointments: PropTypes.arrayOf(PropTypes.shape({
      appointment_time: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TimeSelector;
