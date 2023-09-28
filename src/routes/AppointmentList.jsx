import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAppointments,
} from '../redux/appointments/appointmentSlice';
import placeholderImage from '../assets/doctor-placeholder-image.jpg';

const AppointmentList = () => {
  const dispatch = useDispatch();
  const appointmentsState = useSelector((state) => state.appointments);
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const formatTimeTo24Hour = (timeString) => dayjs(timeString).utc().format('HH:mm:ss');

  return (
    <div className="flex flex-col w-full pt-[50px] justify-between items-center">
      <h1 className="mb-8 text-2xl font-bold">Your Appointments</h1>
      {Array.isArray(appointmentsState.appointments) ? (
        <>
          {appointmentsState.appointments.map((appointment) => (
            <div key={appointment.id} className="flex flex-col w-full md:w-[80%] p-4 md:p-8 mb-4 border border-green-400 rounded-lg shadow-lg">
              <div className="flex flex-col items-center justify-between doctors-details md:flex-row">
                <img src={placeholderImage} alt="Doctor's profile" className="w-[100px] md:w-24 rounded-full" />
                <div className="md:ml-4">
                  <h2 className="mb-2 text-lg font-semibold md:text-xl">{appointment.doctor.name}</h2>
                  <span className="text-sm text-gray-600">
                    Specialization:
                    {' '}
                    {appointment.doctor.specialization.name}
                  </span>
                </div>
              </div>
              <div className="mt-4 appointment-details md:flex md:justify-between md:items-center">
                <div className="mb-2 md:mb-0">
                  <span className="text-sm font-semibold">Appointment Date:</span>
                  <span className="ml-2 text-sm">
                    {new Date(appointment.appointment_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="mb-2 md:mb-0">
                  <span className="text-sm font-semibold">Appointment Time:</span>
                  <span className="ml-2 text-sm">
                    {formatTimeTo24Hour(appointment.appointment_time)}
                  </span>
                </div>
                <div className="mb-2 md:mb-0">
                  <span className="text-sm font-semibold">Appointment Duration:</span>
                  <span className="ml-2 text-sm">
                    {appointment.duration}
                    {' '}
                    minutes
                  </span>
                </div>
                <div className="mb-2 md:mb-0">
                  <span className="text-sm font-semibold">Fee:</span>
                  <span className="ml-2 text-sm">
                    {appointment.doctor.fee_per_appointment}
                    {' '}
                    USD
                  </span>
                </div>
              </div>
              <div className="mt-4 buttons md:mt-6">
                <button
                  type="button"
      // onClick={() => handleUpdateAppointment(appointment.id)}
                  className="w-full px-2 py-1 text-white bg-blue-500 rounded-md md:w-auto hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  type="button"
      // onClick={() => handleDeleteAppointment(appointment.id)}
                  className="w-full px-2 py-1 mt-2 text-white bg-red-500 rounded-md md:w-auto md:mt-0 md:ml-2 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>No appointments available.</div>
      )}
    </div>
  );
};

export default AppointmentList;
