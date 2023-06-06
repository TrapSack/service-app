import { Box } from '@mui/system';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Appbar } from './components/Appbar/Appbar';
import { ScrollContextProvider } from './contexts/scrollContext';
import HomePage from '@Pages/home';

function App() {
  const location = useLocation();
  const boxRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    boxRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  console.log('APP')

  return (
    <ScrollContextProvider value={{ scrollToTop }}>
      <Appbar />
      <Box sx={{ overflow: 'auto', height: '100%' }} ref={boxRef}>
        <HomePage />
      </Box>
    </ScrollContextProvider>
  );
}

export default App;
