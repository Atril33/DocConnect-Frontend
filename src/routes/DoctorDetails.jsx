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
          <div className="flex w-1/4"></div>
        </div>
      </div>
    </>
  );
};

export default DoctorDetails;
