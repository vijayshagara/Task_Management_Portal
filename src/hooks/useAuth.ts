import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (token) {
      dispatch({ type: 'auth/setToken', payload: token });
      try {
        const decodedToken = jwtDecode(token) as { exp: number };
        if (decodedToken.exp * 1000 < Date.now()) {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      }
    }
  }, [token, dispatch, user]);

  return { user, isAuthenticated };
};