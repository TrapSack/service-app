/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import { Box, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ITableDetail, ITablesContainer } from 'src/api/interfaces';
import { ChartModal, SingleDetail, Button } from '@Components/index';
import { scrollContext } from '@Context/scrollContext';
import { v4 as uuid } from 'uuid';
import { DetailsFilters } from '@Components/DetailFilters';
import CoefsModal from '@Components/CoefsModal/CoefsModal';
import { SchemeDataStacked } from '@Components/DetailsChart/DetailsChart';
import { FullDetailInfo } from '../FullDetailInfo';
import { Scheme, calculateDominanceResult } from './helpers';

export type PropsTypes = 'accuracy' | 'price' | 'tech' | 'simplicity';

export type ResultData = {
  id: string;
  props: { [key in PropsTypes]: number };
};

export type ResultDataProp = ResultData['props'];

export function DetailsContainer({ tableContainer }: { tableContainer: ITablesContainer | null }) {
  const [selectedDetail, setSelectedDetail] = useState<ITableDetail | null>(null);
  const [codeString, setCodeString] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mergedContainer, setMergedContainer] = useState<ITableDetail[] | null>(null);
  const [calculatingResults, setCalculatingResults] = useState<ResultData[] | null>(null);
  const [chartData, setChartData] = useState<SchemeDataStacked[] | null>(null);
  const [openChartModal, setOpenChartModal] = useState(false);
  // TODO: add modal open state, connect data with chart modal

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

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleResult = (data: ResultData[]) => {
    setCalculatingResults(data);
    setIsOpen(false);
    setOpenChartModal(true);
  };

  useEffect(() => {
    if (!calculatingResults) {
      return;
    }

    const parsedCalculatingResults: Scheme[] = calculatingResults.map((item) => ({
      id: item.id,
      name: item.id,
      accuracy: item.props.accuracy,
      price: item.props.price,
      simplicity: item.props.simplicity,
      tech: item.props.tech
    }));

    const schemes = calculateDominanceResult(parsedCalculatingResults);
    const schemeForChart: SchemeDataStacked[] = calculatingResults.map((r, index) => ({
      schemeName: r.id,
      schemeLabel: `Схема ${index + 1}`,
      schemeCoefficient: [
        { name: 'Простота', value: schemes.simplicity[`${r.id}`] as number },
        { name: 'Стоимость', value: schemes.price[`${r.id}`] },
        { name: 'Точность', value: schemes.accuracy[`${r.id}`] },
        { name: 'Устойчивость', value: schemes.tech[`${r.id}`] }
      ]
    }));

    setChartData(schemeForChart);
  }, [calculatingResults]);

  useEffect(() => {
    const mergedDetails = detailsArray.map((i) => ({
      //@ts-ignore
      id: uuid(),
      ...i
    }));

    if (mergedDetails) {
      setMergedContainer(mergedDetails);
    }
  }, [detailsArray]);

  console.log(chartData);

  return (
    <Box>
      {selectedDetail ? <FullDetailInfo detail={selectedDetail} setSelectedDetail={setSelectedDetail} /> : null}
      <DetailsFilters setCodeString={setCodeString} />
      <ChartModal data={chartData} open={openChartModal} setIsOpen={setOpenChartModal} />
      {tableContainer && detailsArray.length !== 160 ? (
        <Box
          sx={{
            paddingInline: 5
          }}
        >
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Рассчитать коэффицент переваливания
          </Button>
        </Box>
      ) : null}
      <CoefsModal
        setCalculatingResults={handleResult}
        details={mergedContainer || []}
        isOpen={isOpen}
        handleClose={handleClose}
      />
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
