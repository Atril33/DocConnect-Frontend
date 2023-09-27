import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAppointments,
} from '../redux/appointments/appointmentSlice';
import Sidebar from './Sidebar';
import placeholderImage from '../assets/doctor-placeholder-image.jpg';

const AppointmentList = () => {
  const dispatch = useDispatch();
  const appointmentsState = useSelector((state) => state.appointments);
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const formatTimeTo24Hour = (timeString) => dayjs(timeString).utc().format('HH:mm:ss');

  return (
    <div className="block lg:flex">
      <Sidebar />
      <div className="flex flex-col w-full pt-[50px] justify-between items-center">
        <h1 className="text-2xl font-bold mb-8">Your Appointments</h1>
        {Array.isArray(appointmentsState.appointments) ? (
          <>
            {appointmentsState.appointments.map((appointment) => (
              <div key={appointment.id} className="flex flex-col w-full md:w-[80%] p-4 md:p-8 mb-4 border border-green-400 rounded-lg shadow-lg">
                <div className="doctors-details flex flex-col md:flex-row justify-between items-center">
                  <img src={placeholderImage} alt="Doctor's profile" className="w-[100px] md:w-24 rounded-full" />
                  <div className="md:ml-4">
                    <h2 className="text-lg md:text-xl font-semibold mb-2">{appointment.doctor.name}</h2>
                    <span className="text-sm text-gray-600">
                      Specialization:
                      {' '}
                      {appointment.doctor.specialization.name}
                    </span>
                  </div>
                </div>
                <div className="appointment-details mt-4 md:flex md:justify-between md:items-center">
                  <div className="mb-2 md:mb-0">
                    <span className="text-sm font-semibold">Appointment Date:</span>
                    <span className="text-sm ml-2">
                      {new Date(appointment.appointment_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mb-2 md:mb-0">
                    <span className="text-sm font-semibold">Appointment Time:</span>
                    <span className="text-sm ml-2">
                      {formatTimeTo24Hour(appointment.appointment_time)}
                    </span>
                  </div>
                  <div className="mb-2 md:mb-0">
                    <span className="text-sm font-semibold">Appointment Duration:</span>
                    <span className="text-sm ml-2">
                      {appointment.duration}
                      {' '}
                      minutes
                    </span>
                  </div>
                  <div className="mb-2 md:mb-0">
                    <span className="text-sm font-semibold">Fee:</span>
                    <span className="text-sm ml-2">
                      {appointment.doctor.fee_per_appointment}
                      {' '}
                      USD
                    </span>
                  </div>
                </div>
                <div className="buttons mt-4 md:mt-6">
                  <button
                    type="button"
        // onClick={() => handleUpdateAppointment(appointment.id)}
                    className="w-full md:w-auto px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    type="button"
        // onClick={() => handleDeleteAppointment(appointment.id)}
                    className="w-full md:w-auto mt-2 md:mt-0 md:ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
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
    </div>
  );
};

export default AppointmentList;
