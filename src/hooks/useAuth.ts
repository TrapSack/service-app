import { useContext, useState } from 'react';
import { loginContext } from '../contexts/loginContext';

import { User } from '../types';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const [user, setUser] = useState<User>({ id: 0, isAuth: false, name: '' });
  const { setItem } = useLocalStorage();
  
  const loginUser = (user: Omit<User, 'isAuth'>) => {
    setUser({ ...user, isAuth: true });
    setItem('user', JSON.stringify(user));
  };

  const logoutUser = () => {
    setUser({ id: 0, name: '', isAuth: false });
    setItem('user', '');
  };

  return { user, loginUser, logoutUser, setUser };
};
