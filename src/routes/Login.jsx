import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectAuth } from '../redux/store';
import { loginUser } from '../redux/auth/authActions';
import 'react-toastify/dist/ReactToastify.css';
import useSession from '../hooks/useSession';

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
    <div className="container mx-auto mt-20">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(login)}>
        <input {...register('email')} placeholder="Email" type="email" className="border border-green-500" />
        <input {...register('password')} placeholder="Password" type="password" className="border border-green-500" />
        <input type="submit" className="border border-green-500" />
      </form>
    </div>
  );
};
export default Login;
