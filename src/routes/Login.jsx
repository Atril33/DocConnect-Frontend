import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { selectAuth } from '../redux/store';
import { loginUser } from '../redux/auth/authActions';
import 'react-toastify/dist/ReactToastify.css';
import useSession from '../hooks/useSession';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [userSignedIn] = useSession();
  const {
    error, loggedIn, needsConfirmation,
  } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);

  const { errors } = formState;

  useEffect(() => {
    if (needsConfirmation) {
      toast.info('You need to confirm your email before login in !');
    }
  }, [needsConfirmation]);

  const login = (data) => {
    toast.promise(
      dispatch(loginUser(data)),
      {
        pending: 'loading...',
        error,
        success: 'Service is working!',
      },
    );
  };

  if (error) {
    toast.error(`Oops, something went wrong: ${error}`);
  }

  if (loggedIn || userSignedIn) {
    return <Navigate to="/appointment-list" />;
  }

  return (
    <div
      className="bg-home-background-mobile bg-cover bg-center h-screen relative flex justify-center items-center md:bg-home-background"
    >
      <div className="w-full max-w-xs">
        <h1 className="text-white text-center mb-6 text-5xl font-bold">Sign In</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(login)}>
          <div className="mb-4">
            <Input register={register} name="email" placeholder="Email" type="email" />
            <div className="text-green-700 text-xs">
              {errors.email?.message}
            </div>
          </div>
          <div className="mb-6">
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
          <div className="mb-4 flex justify-center">
            <a className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800" href="/">
              Forgot Password?
            </a>
          </div>
          <div className="mb-4">
            <Button className="w-full" text="Sign In" type="submit" />
          </div>
          <p className="text-center text-gray-500 text-xs">
            Don&apos;t have an account ?
            {' '}
            <Link to="/sign_up" className="underline">Sign Up</Link>
          </p>
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
export default Login;
