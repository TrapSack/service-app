import CloseWindow from '@Assets/svg/closeWindow';
import MaximizeWindow from '@Assets/svg/maximizeWindow';
import zIndex from '@mui/material/styles/zIndex';
import { bgcolor, Box } from '@mui/system';
import { navbarButtonStyle } from './styles';

export function Appbar() {
  const onClose = () => window.Main.Close();
  const onMaximize = () => window.Main.Maximize();
  const onMinimize = () => window.Main.Minimize();

  return (
    <Box
      sx={{
        position: 'sticky',
        top: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: '#1d1c27',
        color: '#f3f4f4',
        paddingLeft: '7px',
        zIndex: '9999'
      }}
    >
      <div>App</div>
      <Box sx={{ display: 'flex' }}>
        <Box sx={navbarButtonStyle} onClick={onMinimize}>
          -
        </Box>
        <Box sx={navbarButtonStyle} onClick={onMaximize}>
          <MaximizeWindow height={12} />
        </Box>
        <Box sx={navbarButtonStyle} onClick={onClose}>
          <CloseWindow height={12} />
        </Box>
      </Box>
    </Box>
  );
}
