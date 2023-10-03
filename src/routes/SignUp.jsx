import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { selectAuth } from '../redux/store';
import { registerUser } from '../redux/auth/authActions';
import useSession from '../hooks/useSession';
import Input from '../components/Input';
import Button from '../components/Button';

const SignUp = () => {
  const [checked, setChecked] = useState(false);
  const [userSignedIn] = useSession();
  const {
    error, needsConfirmation,
  } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    accept_terms: Yup.bool()
      .oneOf([true], 'Accept Ts & Ps is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);

  const { errors } = formState;

  const signup = (data) => {
    toast.promise(
      dispatch(
        registerUser(data),
      ).then(() => {
        if (error) {
          toast.error(`Oops, something went wrong: ${error}`);
        }
      }),
      {
        pending: 'loading...',
        error,
        success: 'Service is working!',
      },
    );
  };

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
            <div className="text-green-700 text-xs">
              {errors.name?.message}
            </div>
          </div>
          <div className="mb-4">
            <Input register={register} name="email" placeholder="Email" type="email" />
            <div className="text-green-700 text-xs">
              {errors.email?.message}
            </div>
          </div>
          <div className="mb-4">
            <Input
              register={register}
              name="password"
              placeholder="Password"
              type="password"
            />
            <div className="text-green-700 text-xs">
              {errors.password?.message}
            </div>
          </div>
          <div className="mb-6">
            <Input
              register={register}
              name="password_confirmation"
              placeholder="Confirm password"
              type="password"
            />
            <div className="text-green-700 text-xs">
              {errors.password_confirmation?.message}
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              checked={checked}
              id="checked-checkbox"
              type="checkbox"
              {...register('accept_terms')}
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <div>
              <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                I agree with
                {' '}
                <span className="underline">Terms</span>
                {' '}
                and
                {' '}
                <span className="underline">Privacy</span>
              </label>
              <div className="text-green-700 text-xs ml-2">
                {errors.accept_terms?.message}
              </div>
            </div>
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
