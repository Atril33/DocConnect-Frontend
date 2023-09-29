import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchdoctors } from '../redux/doctors/doctorSlice';

const DeleteDoctor = () => {
  const doctorsDispatch = useDispatch();

  const allDoctors = useSelector((state) => state.doctors);
  const finalDoctorsData = allDoctors.doctors;
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
                <div className="flex w-[100%] my-2.5 justify-between border p-3 rounded-sm items-center">
                    <h3>{doctor.name}</h3>
                    <button type="button" className="p-2 w-[100px] bg-[#4ecca3] rounded-sm font-bold text-white">Delete</button>
                    </div>
            ))}
        </div>
        </div>
      </div>
    </>
  );
};
export default DeleteDoctor;
