import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { ITablesContainer } from 'src/api/interfaces';
import { DetailsContainer } from '@Components/index';
import { api } from '../../api';
import { tables } from '../../bd_full';

window.tables = tables;

export default function HomePage() {
  console.log(tables);

  return (
    <Box>
      <DetailsContainer tableContainer={tables.tables} />
    </Box>
  );
}
