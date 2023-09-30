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
      <div className="inline-block h-auto p-2 m-2 border-2 border-black rounded-md hover:border-green-400 lg:hidden">
        <button
          type="button"
          className="p-2 text-black hover:text-green-400"
          onClick={toggleMenu}
        >
          <HiMenuAlt4 />
        </button>
      </div>
      <div className={`no-scrollbar fixed left-0 top-0 w-full h-screen border-r bg-black opacity-65 border-r-gray-900 overflow-y-auto text-white transition-transform ease-in-out duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <ul className="pt-24 uppercase">
          <li className="px-8 py-4 transition-colors cursor-pointer hover:text-green-400">
            <AiOutlineCloseCircle onClick={toggleMenu} className="text-3xl" />
          </li>
          <li className="px-8 py-4 transition-colors border-b cursor-pointer border-white-700 hover:text-green-400">
            <Link
              to="/list-docs"
              className="block w-full"
            >
              List of Doctors
            </Link>
          </li>
          <li className="px-8 py-4 transition-colors border-b cursor-pointer border-white-700 hover:text-green-400">
            <Link
              to="/appointment-list"
              className="block w-full"
            >
              Check your Appointments
            </Link>
          </li>
          <li className="px-8 py-4 transition-colors border-b cursor-pointer border-white-700 hover:text-green-400">
            <Link
              to="/create-appointment"
              className="block w-full"
            >
              Schedule a new Appointment
            </Link>
          </li>
          <li className="px-8 py-4 transition-colors border-b cursor-pointer border-white-700 hover:text-green-400">
            <Link
              to="/add-doc"
              className="block w-full"
            >
              Add a new Doctor
            </Link>
          </li>
          <li className="px-8 py-4 transition-colors border-b cursor-pointer border-white-700 hover:text-green-400">
            <Link
              to="/delete-doc"
              className="block w-full"
            >
              Delete a Doctor
            </Link>
          </li>
          <li className="px-8 py-4 transition-colors border-b cursor-pointer border-white-700 hover:text-green-400">
            <Link
              to="/logout"
              className="block w-full"
            >
              Sign out
            </Link>
          </li>
        </ul>
        <ul className="flex flex-row self-end justify-center py-24 align-center">
          <li className="p-[5px]"><FaTwitter className="transition-colors cursor-pointer hover:text-green-400" /></li>
          <li className="p-[5px]"><FaFacebookF className="transition-colors cursor-pointer hover:text-green-400" /></li>
          <li className="p-[5px]"><FaGooglePlusG className="transition-colors cursor-pointer hover:text-green-400" /></li>
          <li className="p-[5px]"><FaVimeoV className="transition-colors cursor-pointer hover:text-green-400" /></li>
          <li className="p-[5px]"><FaPinterestP className="transition-colors cursor-pointer hover:text-green-400" /></li>
        </ul>
      </div>
      <div className="hidden lg:block sticky top-0 w-[25%] h-screen overflow-y-auto no-scrollbar">
        <div className="text-[#181818] w-full h-screen py-2 border-r-2 border-r-[#f3f3f3] overflow-x-hidden hidden lg:flex flex-col justify-between">
          <Link className="px-4" to="/"><img className="w-[80%] m-auto" src={logo} alt="logo" /></Link>
          <ul className="flex flex-col items-start justify-center gap-2 px-4 text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl">
            <li className="w-full px-4 py-4 transition-all rounded-xl text-start hover:text-white hover:bg-green-400">
              <Link
                to="/list-docs"
                className="block w-full"
              >
                List of Doctors
              </Link>
            </li>
            <li className="w-full px-4 py-4 transition-all rounded-xl text-start hover:text-white hover:bg-green-400">
              <Link
                to="/appointment-list"
                className="block w-full"
              >
                Check your Appointments
              </Link>
            </li>
            <li className="w-full px-4 py-4 transition-all rounded-xl text-start hover:text-white hover:bg-green-400">
              <Link
                to="/create-appointment"
                className="block w-full"
              >
                Schedule a new Appointment
              </Link>
            </li>
            <li className="w-full px-4 py-4 transition-all rounded-xl text-start hover:text-white hover:bg-green-400">
              <Link
                to="/add-doc"
                className="block w-full"
              >
                Add a new Doctor
              </Link>
            </li>
            <li className="w-full px-4 py-4 transition-all rounded-xl text-start hover:text-white hover:bg-green-400">
              <Link
                to="/delete-doc"
                className="block w-full"
              >
                Delete a Doctor
              </Link>
            </li>
            <li className="w-full px-4 py-4 transition-all rounded-xl text-start hover:text-white hover:bg-green-400">
              <Link
                to="/logout"
                className="block w-full"
              >
                Sign out
              </Link>
            </li>
          </ul>
          <ul className="flex flex-row justify-center mb-4 align-center">
            <li className="p-[5px]"><FaTwitter className="transition-colors cursor-pointer hover:text-green-400" /></li>
            <li className="p-[5px]"><FaFacebookF className="transition-colors cursor-pointer hover:text-green-400" /></li>
            <li className="p-[5px]"><FaGooglePlusG className="transition-colors cursor-pointer hover:text-green-400" /></li>
            <li className="p-[5px]"><FaVimeoV className="transition-colors cursor-pointer hover:text-green-400" /></li>
            <li className="p-[5px]"><FaPinterestP className="transition-colors cursor-pointer hover:text-green-400" /></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
