import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { selectAuth } from '../redux/store';
import { logoutUser } from '../redux/auth/authActions';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const { error } = useSelector(selectAuth);

  const handleLogOut = () => {
    toast.promise(
      dispatch(logoutUser()),
      {
        pending: 'loading...',
        error,
        success: 'Logout!',
      },
    );
    navigate('/');
  };

  if (error) {
    toast.error(`Oops, something went wrong: ${error}`);
  }

  return (
    <div
      className="bg-home-background-mobile bg-cover bg-center h-screen relative flex justify-center items-center md:bg-home-background"
    >
      <div className="w-full max-w-xs">
        <h1 className="text-white text-center mb-6 text-5xl font-bold">Logout</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(handleLogOut)}>
          <div className="mb-4">
            <p>Are you sure you want to log out?</p>
          </div>
          <div className="mb-4">
            <Button className="w-full" text="Log out" type="submit" />
          </div>
          <p className="text-center text-gray-500 text-xs">OR</p>
          <p className="text-center text-gray-500 text-xs">
            Go back
            {' '}
            <Link to="/" className="underline">Home</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Logout;
