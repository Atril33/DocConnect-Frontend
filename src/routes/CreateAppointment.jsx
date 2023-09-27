import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import DateSelector from '../components/DateSelector';
import TimeSelector from '../components/TimeSelector';
import DoctorSelector from '../components/DoctorSelector';
import { createAppointment } from '../redux/appointments/appointmentSlice';
import { fetchdoctors } from '../redux/doctors/doctorSlice';
import '../styles/appointments.css';

const CreateAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(null);

  const dispatch = useDispatch();
  const doctorsState = useSelector((state) => state.doctors);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchdoctors());
  }, [dispatch]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleDoctorChange = (doctorIndex) => {
    setSelectedDoctorIndex(doctorIndex);
    setSelectedTime('');
  };

  const handleBookAppointment = (e) => {
    const formData = {
      appointment_date: selectedDate,
      appointment_time: selectedTime,
      duration: 30,
      user_id: 1,
      doctor_id: selectedDoctorIndex,
    };
    e.preventDefault();
    dispatch(createAppointment(formData));
    navigate('/appointment-list');
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="appointment-booking-container bg-gray-100 p-4 flex flex-col w-full justify-center items-center space-y-4">
        <form className="flex flex-col w-full justify-center items-center">
          <DoctorSelector
            doctors={doctorsState.doctors}
            selectedDoctorIndex={selectedDoctorIndex}
            onChange={handleDoctorChange}
          />
          <DateSelector selectedDate={selectedDate} onChange={handleDateChange} />
          {selectedDoctorIndex !== null && (
            <TimeSelector
              selectedTime={selectedTime}
              doctor={
                selectedDoctorIndex !== null
                  ? doctorsState.doctors[selectedDoctorIndex]
                  : null
              }
              onChange={handleTimeChange}
            />
          )}
          <button
            type="submit"
            onClick={handleBookAppointment}
            disabled={!selectedDate || !selectedTime || selectedDoctorIndex === null}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
              (!selectedDate || !selectedTime || selectedDoctorIndex === null)
                ? 'cursor-not-allowed opacity-50'
                : ''
            }`}
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAppointment;
