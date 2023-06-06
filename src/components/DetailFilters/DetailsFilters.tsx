import { Box } from '@mui/system';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Radio } from '@mui/material';
import { Button } from '..';
import { MethodFilter, OtherFilter } from './filters';

const filterTypes = ['Метод'] as const;

export function DetailsFilters({ setCodeString }: { setCodeString: Dispatch<SetStateAction<string | null>> }) {
  const [openMain, setOpenMain] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<typeof filterTypes[number]>(() => filterTypes[0]);

  const onFilterOpen = () => {
    setOpenMain(true);
  };

  const onFilterClose = () => {
    setOpenMain(false);
  };

  const displayedFilter = useMemo(() => {
    switch (currentFilter) {
      case 'Метод':
        return <MethodFilter setCodeString={setCodeString} />;
      case 'Другое..':
        return <OtherFilter />;
      default:
        return <MethodFilter setCodeString={setCodeString} />;
    }
  }, [currentFilter]);

  return (
    <Box sx={{ padding: '40px' }}>
      {openMain ? (
        <Button onClick={onFilterClose}>Закрыть фильтры</Button>
      ) : (
        <Button onClick={onFilterOpen}>Открыть фильтры</Button>
      )}
      {openMain && (
        <Box>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            {filterTypes.map((ft) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Radio
                  name="filterType"
                  id="filterType"
                  value={ft}
                  checked={currentFilter === ft}
                  onClick={() => setCurrentFilter(ft)}
                />{' '}
                {ft}
              </Box>
            ))}
          </Box>

          {displayedFilter}
        </Box>
      )}
    </Box>
  );
}
