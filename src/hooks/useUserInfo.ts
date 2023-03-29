import { useContext, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useLocalStorage } from './useLocalStorage';
import { User } from '../types';
import { loginContext } from '../contexts/loginContext';

export const useUserInfo = () => {
  const { loginUser, logoutUser } = useAuth();
  const { getItem } = useLocalStorage();
  const { user } = useContext(loginContext);

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      loginUser(JSON.parse(user));
    }
  }, []);

  const login = (user: Omit<User, 'isAuth'>) => {
    loginUser(user);
  };

  const logout = () => {
    logoutUser();
  };

  return { user, login, logout };
};
