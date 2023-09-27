import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { selectAuth } from '../redux/store';
import { registerUser } from '../redux/auth/authActions';
import useSession from '../hooks/useSession';
import Input from '../components/Input';
import Button from '../components/Button';

const SignUp = () => {
  const [checked, setChecked] = useState(false);
  const [userSignedIn] = useSession();
  const { register, handleSubmit } = useForm();
  const {
    loading, error, needsConfirmation,
  } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const signup = (data) => {
    dispatch(registerUser(data));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (needsConfirmation) {
    return <Navigate to="/login" />;
  }

  if (userSignedIn) {
    return <Navigate to="/appointment-list" />;
  }

  return (
    <div
      className="bg-home-background-mobile bg-cover bg-center h-screen relative flex justify-center items-center md:bg-home-background"
    >
      <div className="w-full max-w-xs">
        <h1 className="text-white text-center mb-6 text-5xl font-bold">Sign Up</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(signup)}>
          <div className="mb-4">
            <Input register={register} name="name" placeholder="Username" type="text" />
          </div>
          <div className="mb-4">
            <Input register={register} name="email" placeholder="Email" type="email" />
          </div>
          <div className="mb-4">
            <Input register={register} name="password" placeholder="Password" type="password" />
          </div>
          <div className="mb-6">
            <Input register={register} name="password_confirmation" placeholder="Confirm password" type="password" />
          </div>
          <div className="flex items-center mb-4">
            <input
              checked={checked}
              id="checked-checkbox"
              type="checkbox"
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              I agree with
              {' '}
              <a className="underline" href="https://google.com">Terms</a>
              {' '}
              and
              {' '}
              <a className="underline" href="https://google.com">Privacy</a>
            </label>
          </div>
          <div className="mb-4">
            <Button className="w-full" text="Sign Up" type="submit" />
          </div>
          <p className="text-center text-gray-500 text-xs">
            Already a user ?
            {' '}
            <Link to="/login" className="underline">Sign In</Link>
          </p>
          <p className="text-center text-gray-500 text-xs">OR</p>
          <p className="text-center text-gray-500 text-xs">
            Go back
            {' '}
            {' '}
            <Link to="/" className="underline">Home</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
