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
    ).then(() => navigate('/'));
  };

  if (error) {
    toast.error(`Oops, something went wrong: ${error}`);
  }

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-center bg-cover bg-home-background-mobile md:bg-home-background"
    >
      <div className="w-full max-w-xs">
        <h1 className="mb-6 text-5xl font-bold text-center text-white">Logout</h1>
        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md" onSubmit={handleSubmit(handleLogOut)}>
          <div className="mb-4">
            <p>Are you sure you want to log out?</p>
          </div>
          <div className="mb-4">
            <Button className="w-full" text="Log out" type="submit" />
          </div>
          <p className="text-xs text-center text-gray-500">OR</p>
          <p className="text-xs text-center text-gray-500">
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
