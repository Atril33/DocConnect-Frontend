import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchdoctors } from '../redux/doctors/doctorSlice';

const DeleteDoctor = () => {
  const doctorsDispatch = useDispatch();

  const allDoctors = useSelector((state) => state.doctors);
  const finalDoctorsData = allDoctors.doctors;

  // Define the handleDelete function to delete a doctor by ID
  const handleDelete = async (doctorId) => {
    try {
      // Make an HTTP DELETE request to your API endpoint with the doctor ID
      const response = await fetch(`https://docconnect-afnq.onrender.com/api/v1/doctors/${doctorId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });


      if (response.ok) {
        // If the deletion was successful, you can update your local data or Redux store accordingly.
        console.log(`Doctor with ID ${doctorId} has been deleted.`);
        // You may want to dispatch an action to update your Redux store here.
      } else {
        // Handle any errors here, e.g., display an error message to the user.
        console.error(`Failed to delete doctor with ID ${doctorId}`);
      }
    } catch (error) {
      // Handle network or other errors here.
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
            {finalDoctorsData.map((doctor) => (
              <div className="flex w-[100%] my-2.5 justify-between border p-3 rounded-sm items-center" key={doctor.id}>
                <h3>{doctor.name}</h3>
                <button
                  type="button"
                  className="p-2 w-[100px] bg-[#4ecca3] rounded-sm font-bold text-white"
                  onClick={() => handleDelete(doctor.id)} // Pass the doctor's ID to handleDelete function
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
