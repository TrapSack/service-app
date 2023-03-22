import { useMemo } from 'react';
import HomePage from '../pages/home';
import { ROUTE_NAMES } from './routeNames';

export default function Router({ route }: { route: ROUTE_NAMES }) {
  const RouteElement = useMemo(() => {
    switch (route) {
      case ROUTE_NAMES.HOME:
        return <HomePage />;
      default:
        return null;
    }
  }, [route]);

  return RouteElement;
}
