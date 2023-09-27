import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { doctorsFetchData } from '../redux/doctors/doctorSlice';
import './style.css';
import Sidebar from './Sidebar';

const Doctors = () => {
  const doctorsDispatch = useDispatch()
  const { allDoctors  } = useSelector((store) => store.doctors);

  useEffect(() => {
   doctorsDispath(doctorsFetchData())
  }, [doctorsDispatch])
return (
  <>
  <div className="doctor-container">
  <Sidebar />
  <div className="doctor-list-container">
    <div className="doctor-text-container">
      <h2 className="doctor-title-text">Meet Our Physicians</h2>
      <p className="doctor-paragraph-text">Please select doctor of appointment</p>
    </div>

    <div className="doctors-listing">
      <div className="doctor-box"></div>
    </div>
    </div>
  </div>
  </>
)
}

export default Doctors;
