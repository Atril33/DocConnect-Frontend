import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAppointments,
} from '../redux/appointments/appointmentSlice';

const AppointmentList = () => {
  const dispatch = useDispatch();
  const appointmentsState = useSelector((state) => state.appointments);
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const formatTimeTo24Hour = (timeString) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    return new Date(timeString).toLocaleTimeString([], options);
  };

  return (
    <div className="flex flex-col w-full pt-[50px] justify-between items-center">
      <h1 className="mb-4 text-2xl font-bold">Appointments</h1>
      {Array.isArray(appointmentsState.appointments) ? (
        <table className="min-w-full divide-y divide-gray-200 sm:table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-4">
                Date
              </th>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-4">
                Time
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Duration (min)
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Doctor
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointmentsState.appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(appointment.appointment_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatTimeTo24Hour(appointment.appointment_time)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.doctor.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    // onClick={() => handleUpdateAppointment(appointment.id)}
                    className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    // onClick={() => handleDeleteAppointment(appointment.id)}
                    className="px-2 py-1 ml-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No appointments available.</div>
      )}
    </div>
  );
};

export default AppointmentList;
