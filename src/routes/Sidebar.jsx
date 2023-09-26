import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTwitter, FaFacebookF, FaGooglePlusG, FaVimeoV, FaPinterestP,
} from 'react-icons/fa';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import logo from '../logo.png';

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="lg:hidden p-4">
        <button
          type="button"
          className="p-2 text-black hover:text-green-400"
          onClick={toggleMenu}
        >
          <HiMenuAlt4 />
        </button>
      </div>
      <div className="sticky top-0 w-[25%] h-screen overflow-y-auto">
        <div className={`fixed left-0 top-0 w-full h-full border-r bg-black opacity-65 border-r-gray-900 text-white transition-transform ease-in-out duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <ul className="pt-24 uppercase">
            <li className="py-4 px-8 cursor-pointer hover:text-green-400 transition-colors">
              <AiOutlineCloseCircle onClick={toggleMenu} className="text-3xl" />
            </li>
            <li className="py-4 px-8 border-b border-white-700 cursor-pointer hover:text-green-400 transition-colors">Doc Details</li>
            <li className="py-4 px-8 border-b border-white-700 cursor-pointer hover:text-green-400 transition-colors">Appointments</li>
            <li className="py-4 px-8 border-b border-white-700 cursor-pointer hover:text-green-400 transition-colors">Schedule Appointment</li>
            <li className="py-4 px-8 border-b border-white-700 cursor-pointer hover:text-green-400 transition-colors">Add more</li>
          </ul>
          <ul className="flex py-24 flex-row self-end align-center justify-center">
            <li className="p-[5px]"><FaTwitter className="cursor-pointer hover:text-green-400 transition-colors" /></li>
            <li className="p-[5px]"><FaFacebookF className="cursor-pointer hover:text-green-400 transition-colors" /></li>
            <li className="p-[5px]"><FaGooglePlusG className="cursor-pointer hover:text-green-400 transition-colors" /></li>
            <li className="p-[5px]"><FaVimeoV className="cursor-pointer hover:text-green-400 transition-colors" /></li>
            <li className="p-[5px]"><FaPinterestP className="cursor-pointer hover:text-green-400 transition-colors" /></li>
          </ul>
        </div>
        <div className="text-[#181818] w-[100%] min-h-screen py-2 border-r-2 border-r-[#f3f3f3] overflow-x-hidden hidden lg:block">
          <Link className="px-4" to="/"><img className="w-[80%] m-auto" src={logo} alt="logo" /></Link>
          <ul className="flex flex-col py-16 pl-8 justify-center items-start text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl">
            <li className="w-full text-start py-4 mb-4 hover:text-white hover:bg-green-400 transition-all">
              <Link
                to="/docdetails"
                className="block w-full "
              >
                Doc Details
              </Link>
            </li>
            <li className="w-full text-start py-4 mb-4 hover:text-white hover:bg-green-400 transition-all">
              <Link
                to="/appointments"
                className="block w-full"
              >
                Appointments
              </Link>
            </li>
            <li className="w-full text-start py-4 mb-4 hover:text-white hover:bg-green-400 transition-all">
              <Link
                to="/schedule-appointment"
                className="block w-full"
              >
                Schedule Appointment
              </Link>
            </li>
            <li className="w-full text-start py-4 mb-4 hover:text-white hover:bg-green-400 transition-all">
              <Link
                to="/add-more"
                className="block w-full"
              >
                Add more
              </Link>
            </li>
          </ul>
          <ul className="flex py-24 flex-row self-end align-center justify-center">
            <li className="p-[5px]"><FaTwitter className="cursor-pointer hover:text-green-400 transition-colors" /></li>
            <li className="p-[5px]"><FaFacebookF className="cursor-pointer hover:text-green-400 transition-colors" /></li>
            <li className="p-[5px]"><FaGooglePlusG className="cursor-pointer hover:text-green-400 transition-colors" /></li>
            <li className="p-[5px]"><FaVimeoV className="cursor-pointer hover:text-green-400 transition-colors" /></li>
            <li className="p-[5px]"><FaPinterestP className="cursor-pointer hover:text-green-400 transition-colors" /></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
