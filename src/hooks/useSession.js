import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../redux/store';
import { getCurrentUser } from '../redux/auth/authActions';

const useSession = () => {
  const {
    currentUser,
  } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const [token] = useState(() => {
    // getting stored value
    const initialValue = localStorage.getItem('token');
    return initialValue || '';
  });
  const [tokenTime] = useState(() => {
    // getting stored value
    const initialValue = Number(localStorage.getItem('token_time'));
    return initialValue || Date.now();
  });

  const userSignedIn = token && Math.abs((Date.now() - tokenTime)) < 1_800_000; // 30 minutes

  useEffect(() => {
    if (!currentUser && userSignedIn) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, currentUser, userSignedIn]);

  return [userSignedIn, currentUser];
};

export default useSession;
