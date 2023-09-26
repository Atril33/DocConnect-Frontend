import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAppointments, setLoading, setError, useAppointments,
} from '../redux/appointments/appointmentSlice';
import Sidebar from './Sidebar';

const AppointmentList = () => {
  const dispatch = useDispatch();
  const { data: appointments, isLoading, error } = useAppointments();
  const appointmentsState = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(setLoading(isLoading));
    if (appointments) {
      dispatch(setAppointments(appointments));
    }
    if (error) {
      dispatch(setError(error.message));
    }
  }, [dispatch, appointments, isLoading, error]);

  const handleDeleteAppointment = (appointmentId) => {
    console.log(appointmentId);
  };

  const handleUpdateAppointment = (appointmentId) => {
    console.log(appointmentId);
  };

  return (
    <div className="flex">
      <Sidebar />
      {appointmentsState.isLoading && <div>Loading...</div>}
      {appointmentsState.error && (
        <div>
          Error:
          {appointmentsState.error}
        </div>
      )}
      <div className="flex flex-col w-full pt-[50px] justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Appointments</h1>
        {Array.isArray(appointmentsState.appointments.appointments) ? (
          <table className="min-w-full divide-y divide-gray-200 sm:table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration (min)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointmentsState.appointments.appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(appointment.appointment_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(appointment.appointment_time).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appointment.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appointment.doctor_id}
                    {' '}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleUpdateAppointment(appointment.id)}
                      className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
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
    </div>
  );
};

export default AppointmentList;
