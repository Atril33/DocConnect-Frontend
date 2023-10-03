import { Link } from 'react-router-dom';

const UnAuthorize = () => (
  <div className="flex flex-col items-center justify-center h-screen w-screen">
    <p className="text-center">You are no authorize for this action!</p>
    <p className="text-center">Try another page</p>
    <Link to="/appointment-list" className="flex flex-row items-center px-8 py-4 mt-8 bg-green-400 rounded-full cursor-pointer justify-evenly hover:bg-green-500 transition-bg">Go to your Appointment</Link>
  </div>
);
export default UnAuthorize;
