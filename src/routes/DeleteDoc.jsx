import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchdoctors, deleteDoctor } from '../redux/doctors/doctorSlice';

const DeleteDoctor = () => {
  const doctorsDispatch = useDispatch();
  const { doctors } = useSelector((store) => store.doctors);
  const authToken = localStorage.getItem('token');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleDelete = async (doctorId) => {
    try {
      // Dispatch the deleteDoctor action
      await doctorsDispatch(deleteDoctor(doctorId));

      // You can remove the doctor from the Redux state immediately after dispatching
      const updatedDoctors = doctors.filter((doctor) => doctor.id !== doctorId);
      doctorsDispatch({ type: 'doctors/setdoctors', payload: updatedDoctors });

      // Redirect to the /doctors page
      navigate('/doctors'); // Use navigate to navigate
    } catch (error) {
      console.error(`Error while deleting doctor: ${error}`);
    }
  };

  useEffect(() => {
    doctorsDispatch(fetchdoctors());
  }, [doctorsDispatch]);

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex items-center w-[90%] flex-col">
          <h3 className="text-2xl my-8 font-bold uppercase text-zinc-800">Delete Doctors</h3>
          <div className="flex w-[90%] flex-col items-center">
            {doctors.map((doctor) => (
              <div className="flex w-[100%] my-2.5 justify-between border p-3 rounded-sm items-center" key={doctor.id}>
                <h3>{doctor.name}</h3>
                <button
                  type="button"
                  className="p-2 w-[100px] bg-[#4ecca3] rounded-sm font-bold text-white"
                  onClick={() => handleDelete(doctor.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteDoctor;
