import { useEffect, useState } from 'react';

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(false);

  const checkOnlineStatus = () => setIsOnline(navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', checkOnlineStatus);
  }, []);

  return isOnline;
};
