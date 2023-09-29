import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

const DoctorDetails = () => {
  const { id } = useParams();
  const { allDoctors } = useSelector((store) => store.doctors);
  const doctor = allDoctors.find((item) => item.id === parseInt(id, 10));

  return (
    <>
      <div className="flex w-full h-auto">
        <Sidebar />
        <div className="flex w-full h-auto justify-around">
          <div className="flex w-3/5 h-screen items-center justify-center">
            <img src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg" className="w-3/4 rounded-md" alt={doctor.name} />
          </div>
          <div className="flex w-1/4 pb-5 pt-5 flex-col">
            <div className="flex w-full h-20 flex-col items-end mt-14">
              <h3 className="text-3xl font-semibold uppercase tracking-wide font-serif">
                {' Dr. '}
                {doctor.name.trim()}
              </h3>
              <p className="text-sm font-semibold text-zinc-600">
                {'I am '}
                {doctor.name.trim()}
                {' a Physicians'}
              </p>

            </div>
            <div className="flex flex-col mt-4">
              <div className="flex w-full justify-between items-center bg-[#e2e3e5] p-2 text-sm font-semibold text-zinc-600 capitalize">
                <p>Name</p>
                <h3>{doctor.name}</h3>
              </div>
              <div className="flex w-full justify-between items-center bg-[#fff] p-2 text-sm font-semibold text-zinc-600 capitalize">
                <p>Fee Per Appointment</p>
                <h3>{doctor.fee_per_appointment}</h3>
              </div>
              <div className="flex w-full justify-between items-center bg-[#e2e3e5] p-2 text-sm font-semibold text-zinc-600 capitalize">
                <p>Time Available From</p>
                <h3>{doctor.time_available_from}</h3>
              </div>
              <div className="flex w-full justify-between items-center bg-[#fff] p-2 text-sm font-semibold text-zinc-600 capitalize">
                <p>Time Available To</p>
                <h3>{doctor.time_available_to}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDetails;