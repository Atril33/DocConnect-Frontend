import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
      doctor_id: selectedDoctorIndex,
    };
    e.preventDefault();
    dispatch(createAppointment(formData));
    navigate('/appointment-list');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 space-y-4 bg-gray-100 appointment-booking-container">
      <div className="bg-white md:px-24 md:py-6 md:rounded-2xl md:border-2 md:border-green-400">
        <h1 className="my-5 text-2xl font-bold text-center md:mt-10">Schedule a new Appointment</h1>
        <form className="flex flex-col items-center justify-center w-full gap-4">
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
                ? doctorsState.doctors.find((doctor) => doctor.id === selectedDoctorIndex)
                : null
              }
              onChange={handleTimeChange}
            />
          )}
          <button
            type="submit"
            onClick={handleBookAppointment}
            className={`bg-blue-500 text-white px-4 py-2 mb-4 rounded-md hover:bg-blue-600 ${
              (!selectedDate || !selectedTime || selectedDoctorIndex === null)
                ? 'hidden opacity-50'
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
