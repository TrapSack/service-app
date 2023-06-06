import { Box, Modal } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { DetailsChart, SchemeDataSingle, SchemeDataStacked } from './DetailsChart';
import { Button } from '..';

export function ChartModal({
  open,
  setIsOpen,
  data
}: {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: SchemeDataSingle[] | SchemeDataStacked[];
}) {
  return (
    <Modal
      open={open}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClose={() => setIsOpen(false)}
    >
      <Box
        sx={{
          width: '600px',
          bgcolor: '#fff',
          padding: '30px'
        }}
      >
        <Box sx={{ height: '300px', border: '1px solid #000', padding: '15px' }}>
          <DetailsChart data={data} />
        </Box>
        <Button sx={{ mt: 5 }} onClick={() => setIsOpen(false)}>
          Закрыть
        </Button>
      </Box>
    </Modal>
  );
}
