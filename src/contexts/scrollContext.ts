import { createContext } from 'react';

export const scrollContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  scrollToTop: () => {}
});

export const ScrollContextProvider = scrollContext.Provider;
