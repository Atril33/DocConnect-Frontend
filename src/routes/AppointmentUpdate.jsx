import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DateSelector from '../components/DateSelector';
import TimeSelector from '../components/TimeSelector';
import DoctorSelector from '../components/DoctorSelector';
import { updateAppointment } from '../redux/appointments/appointmentSlice';
import { fetchdoctors } from '../redux/doctors/doctorSlice';
import '../styles/appointments.css';

const AppointmentUpdate = () => {
  const { appId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchdoctors());
  }, [dispatch, appId]);

  const appointmentsState = useSelector((state) => state.appointments);
  const doctorsState = useSelector((state) => state.doctors);
  const appointment = appointmentsState.appointments.filter((elem) => elem.id === +appId);
  const [selectedDate, setSelectedDate] = useState(
    appointment[0]?.appointment_date || new Date(),
  );
  const [selectedTime, setSelectedTime] = useState(
    appointment[0]?.appointment_time || '',
  );
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(
    appointment[0]?.doctor?.id || null,
  );

  const handleCancel = () => {
    navigate('/appointment-list');
  };

  const convertTo24HourFormat = (time) => {
    if (!time) {
      return '';
    }
    const hour = time.split('T');
    const [hours, minutes] = hour[1].split(':').map(Number);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  if (appointment.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 space-y-4 bg-gray-100 appointment-booking-container">
        <div className="bg-white md:px-24 md:py-6 md:rounded-2xl md:border-2 md:border-green-400">
          <h1 className="my-5 text-2xl font-bold text-center md:mt-10">This appointment does not exist.</h1>
        </div>
      </div>
    );
  }

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
    dispatch(updateAppointment(formData, appId));
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
          <p>
            Current Doctor:
            {' '}
            {appointment[0]?.doctor?.name}
          </p>
          <p>
            Current Date:
            {' '}
            {appointment[0]?.appointment_date}
          </p>
          <p>
            Current time:
            {' '}
            {convertTo24HourFormat(appointment[0]?.appointment_time)}
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleBookAppointment}
              className={`bg-blue-500 text-white px-4 py-2 mb-4 rounded-md hover:bg-blue-600 ${
                (!selectedDate || !selectedTime || selectedDoctorIndex === null)
                  ? 'hidden opacity-50'
                  : ''
              }`}
            >
              Update Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentUpdate;
