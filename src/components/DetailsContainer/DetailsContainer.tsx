/* eslint-disable react/no-array-index-key */
import { Box, Grid } from '@mui/material';
import { useContext, useMemo, useState } from 'react';
import { ITableDetail, ITablesContainer } from 'src/api/interfaces';
import { SingleDetail } from '@Components/index';
import { scrollContext } from '@Context/scrollContext';
import { DetailsFilters } from '@Components/DetailFilters';
import { FullDetailInfo } from '../FullDetailInfo';

export function DetailsContainer({ tableContainer }: { tableContainer: ITablesContainer | null }) {
  const [selectedDetail, setSelectedDetail] = useState<ITableDetail | null>(null);
  const [codeString, setCodeString] = useState<string | null>(null);

  const { scrollToTop } = useContext(scrollContext);

  const detailsArray = useMemo(() => {
    if (tableContainer) {
      const detailsArray = Object.values(tableContainer).reduce((acc, current) => [...acc, ...current], []);
      if (codeString) {
        const filteredDetails = detailsArray.filter((d) => d.taskCodes.includes(codeString));

        return filteredDetails;
      }

      return detailsArray;
    }

    return [];
  }, [tableContainer, codeString]);

  const setSelectedDetailWithSroll = (detail: ITableDetail) => {
    setSelectedDetail(detail);
    scrollToTop();
  };

  return (
    <Box>
      {selectedDetail ? <FullDetailInfo detail={selectedDetail} setSelectedDetail={setSelectedDetail} /> : null}
      <DetailsFilters setCodeString={setCodeString} />
      <Grid container spacing={5} sx={{ padding: '40px' }}>
        {detailsArray.map((detail, index) => (
          <Grid item xs={6} md={3} lg={2} key={index}>
            <SingleDetail detail={detail} setSelectedDetail={setSelectedDetailWithSroll} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
