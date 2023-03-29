import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from '../types';

export const loginContext = createContext<{ user: User }>({
  user: { id: 0, name: '', isAuth: false }
});

export default loginContext.Provider;
