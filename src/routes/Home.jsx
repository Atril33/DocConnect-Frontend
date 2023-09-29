import React from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoIosArrowDropright } from 'react-icons/io';
import { Link } from 'react-router-dom';
import useSession from '../hooks/useSession';

const Home = () => {
  const [userSignedIn] = useSession();

  return (
    <div
      className={`bg-home-background-mobile bg-cover bg-center h-screen relative flex flex-col text-white ${
        'md:bg-home-background'
      }`}
    >
      <div className="w-full h-full flex flex-col items-center justify-end">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold">
          DocConnect - Your Health
          Comes First
        </h1>
      </div>

      { userSignedIn ? (
        <div className="items-center justify-end md:justify-center flex flex-col  sm:flex-row gap-5 w-full h-full pb-3">
          <Link to="/appointment-list" className="flex flex-row items-center justify-evenly rounded-full bg-green-400 py-2 px-4 sm:py-4 sm:px-8 cursor-pointer hover:bg-green-500 transition-bg">
            <IoSettingsOutline className="text-3xl" />
            <span className="px-4">Check your Appointments</span>
            <IoIosArrowDropright className="text-3xl" />
          </Link>
          <Link to="/logout" className="flex flex-row items-center justify-evenly rounded-full bg-green-400 py-2 px-4 sm:py-4 sm:px-8 cursor-pointer hover:bg-green-500 transition-bg">
            <IoSettingsOutline className="text-3xl" />
            <span className="px-4">Sign out</span>
            <IoIosArrowDropright className="text-3xl" />
          </Link>
        </div>
      ) : (
        <div className="items-center justify-end md:justify-center sm:flex-row gap-5 flex flex-col w-full h-full pb-3">
          <Link to="/sign_up" className="flex flex-row items-center justify-evenly rounded-full bg-green-400 py-2 px-4 sm:py-4 sm:px-8 cursor-pointer hover:bg-green-500 transition-bg">
            <IoSettingsOutline className="text-3xl" />
            <span className="px-4">Sign Up</span>
            <IoIosArrowDropright className="text-3xl" />
          </Link>
          <Link to="/login" className="flex flex-row items-center justify-evenly rounded-full bg-green-400 py-2 px-4 sm:py-4 sm:px-8 cursor-pointer hover:bg-green-500 transition-bg">
            <IoSettingsOutline className="text-3xl" />
            <span className="px-4">Log In</span>
            <IoIosArrowDropright className="text-3xl" />
          </Link>
        </div>
      ) }
    </div>
  );
};

export default Home;
