import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../redux/store';
import { getCurrentUser } from '../redux/auth/authActions';

const useSession = () => {
  const {
    userInfo,
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
    if (!userInfo && userSignedIn) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, userInfo, userSignedIn]);
  return [userSignedIn, userInfo];
};

export default useSession;
