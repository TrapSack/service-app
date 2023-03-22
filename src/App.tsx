import { Box, Container } from '@mui/material';
import { useContext, useState } from 'react';
import routeContext, { Provider as RouteProvider } from './contexts/routeContext';
import Router from './routes';
import { ROUTE_NAMES } from './routes/routeNames';

function App() {
  console.log(window.ipcRenderer);
  const [route, setRoute] = useState(ROUTE_NAMES.HOME);

  return (
    <RouteProvider value={{ route, setRoute }}>
      <Container sx={{ width: 1, height: '100%' }}>
        <Router route={route} />
      </Container>
    </RouteProvider>
  );
}

export default App;
