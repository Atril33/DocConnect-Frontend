import React from 'react';
import { useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

const DoctorDetails = () => {

  const { id } = useParams();
  const { allDoctors } = useSelector((store) => store.doctors);
  const doctor = allDoctors.find(item => item.id === parseInt(id, 10));
 console.log(doctor);

  return (
  <>
    <div className="flex w-full h-auto">
      <Sidebar />
      <div className="flex-1 h-screen py-32 px-8">
        AppointmentList
      </div>
    </div>
  </>
)
  }

export default DoctorDetails;
