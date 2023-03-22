import { createContext, Dispatch, SetStateAction } from 'react';
import { ROUTE_NAMES } from '../routes/routeNames';

const routeContext = createContext<{ route: ROUTE_NAMES; setRoute: Dispatch<SetStateAction<ROUTE_NAMES>> }>({
  route: ROUTE_NAMES.HOME,
  setRoute: (val) => null
});

export default routeContext;
export const { Provider } = routeContext;
