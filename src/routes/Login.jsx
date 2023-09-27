import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectAuth } from '../redux/store';
import { loginUser } from '../redux/auth/authActions';
import 'react-toastify/dist/ReactToastify.css';
import useSession from '../hooks/useSession';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [userSignedIn] = useSession();
  const { register, handleSubmit } = useForm();
  const {
    loading, error, loggedIn, needsConfirmation,
  } = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (needsConfirmation) {
      toast('You need to confirm your email before login in !');
    }
  }, [needsConfirmation]);

  const login = (data) => {
    dispatch(loginUser(data));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
          </div>
          <div className="mb-6">
            <Input register={register} name="password" placeholder="Password" type="password" />
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
