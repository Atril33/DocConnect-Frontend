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
    <div className="flex flex-col items-center w-11/12 max-w-lg gap-5 mx-auto md:my-10">
      <h1 className="my-5 text-2xl font-bold md:my-10">Your Appointments</h1>
      {Array.isArray(appointmentsState.appointments) ? (
        <>
          {appointmentsState.appointments.map((appointment) => (
            <div key={appointment.id} className="flex flex-col w-full md:w-[80%] p-4 md:p-8 border border-green-400 rounded-lg shadow-lg">
              <div className="flex items-center justify-around doctors-details">
                <img src={placeholderImage} alt="Doctor's profile" className="w-[75px]  md:w-24 rounded-full" />
                <div>
                  <h2 className="mb-2 text-lg font-semibold text-center md:text-xl">{appointment.doctor.name}</h2>
                  <span className="text-sm text-gray-600">
                    Specialization:
                    {' '}
                    {appointment.doctor.specialization.name}
                  </span>
                </div>
              </div>
              <div className="mt-4 appointment-details">
                <div className="mb-2">
                  <span className="text-sm font-semibold">Appointment Date:</span>
                  <span className="ml-2 text-sm">
                    {new Date(appointment.appointment_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-semibold">Appointment Time:</span>
                  <span className="ml-2 text-sm">
                    {formatTimeTo24Hour(appointment.appointment_time)}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-semibold">Appointment Duration:</span>
                  <span className="ml-2 text-sm">
                    {appointment.duration}
                    {' '}
                    minutes
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-semibold">Fee:</span>
                  <span className="ml-2 text-sm">
                    {appointment.doctor.fee_per_appointment}
                    {' '}
                    USD
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 md:mt-4">
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
                  className="w-full px-2 py-1 text-white bg-red-500 rounded-md md:w-auto md:mt-0 md:ml-2 hover:bg-red-600"
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
