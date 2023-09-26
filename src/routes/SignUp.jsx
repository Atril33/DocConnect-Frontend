import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuth } from '../redux/store';
import { registerUser } from '../redux/auth/authActions';
import useSession from '../hooks/useSession';

const SignUp = () => {
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
    <div className="container mx-auto mt-20">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(signup)}>
        <input {...register('name')} placeholder="Username" type="text" className="border border-green-500" />
        <input {...register('email')} placeholder="Email" type="email" className="border border-green-500" />
        <input {...register('password')} placeholder="Passowrd" type="password" className="border border-green-500" />
        <input
          {...register('password_confirmation')}
          placeholder="Passowrd confirmation"
          type="password"
          className="border border-green-500"
        />
        <input type="submit" className="border border-green-500" />
      </form>
    </div>
  );
};

export default SignUp;
