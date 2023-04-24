import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { ITablesContainer } from 'src/api/interfaces';
import { DetailsContainer } from '@Components/index';
import { api } from '../../api';

export default function HomePage() {
  const [tables, setTables] = useState<ITablesContainer | null>(null);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (!tables) {
      setIsloading(true);
      api
        .getTables()
        .then((res) => setTables(res.data))
        .finally(() => setIsloading(false))
        .catch(console.log);
    }
  }, []);

  console.log(tables);

  return (
    <Box>
      <DetailsContainer tableContainer={tables} />
    </Box>
  );
}
