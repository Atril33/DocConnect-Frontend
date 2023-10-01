import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import settingIcon from '../assets/setting.png';
import nextArrowIcon from '../assets/next-arrow.png';

const DoctorDetail = () => {
  const { id } = useParams();
  const allDoctors = useSelector((state) => state.doctors);
  const finalDoctorsData = allDoctors.doctors;
  const doctor = finalDoctorsData.find((item) => item.id === parseInt(id, 10));
  
  const fromTime = new Date(doctor.time_available_from);
  const toTime = new Date(doctor.time_available_to);

  const formattedFromTime = fromTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const formattedToTime = toTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <>
      <div className="flex w-full h-auto">
        <div className="flex w-full h-auto justify-around max-[1000px]:flex-col max-[1000px]:items-center">
          <div className="flex w-3/5 h-screen items-center justify-center max-[1000px]:w-ful">
            <img src={doctor.photo_url} className="w-3/5 rounded-full max-[1000px]:w-full" alt={doctor.name} />
          </div>
          <div className="flex w-2/5 pb-5 pt-5 flex-col max-[1000px]:w-4/5 max-[1000px]:-mt-24">
            <div className="flex w-full h-20 flex-col items-end mt-14 max-[1000px]:items-center max-[1000px]:mt-1">
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
                <h3>{formattedFromTime}</h3>
              </div>
              <div className="flex w-full justify-between items-center bg-[#fff] p-2 text-sm font-semibold text-zinc-600 capitalize">
                <p>Time Available To</p>
                <h3>{formattedToTime}</h3>
              </div>
            </div>
            <Link to="/create-appointment">
              <div className="flex w-auto h-auto bg-[#4ecca3] p-3.5 my-6 items-center justify-between rounded-[30px] cursor-pointer max-[1000px]:p-2 hover:bg-[#34b288]">
                <img src={settingIcon} alt="Setting Icon" className="w-9" />
                <h3 className="text-[#fff] font-semibold">Schedule Appointment</h3>
                <img src={nextArrowIcon} alt="Next Arrow Icon" className="w-6" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDetail;
