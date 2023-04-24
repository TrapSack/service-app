import { Box } from '@mui/system';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Appbar } from './components/Appbar/Appbar';
import { ScrollContextProvider } from './contexts/scrollContext';
import Router from './routes';

function App() {
  console.log(window.ipcRenderer);
  const location = useLocation();
  const boxRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    boxRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  console.log(location.pathname);

  return (
    <ScrollContextProvider value={{ scrollToTop }}>
      <Appbar />
      <Box sx={{ overflow: 'auto', height: '100%' }} ref={boxRef}>
        <Router />
      </Box>
    </ScrollContextProvider>
  );
}

export default App;
