import { Collapse, Grid, Table } from '@mui/material';
import { Box } from '@mui/system';
import type { Dispatch, SetStateAction } from 'react';
import type { ITableDetail } from 'src/api/interfaces';
import { Button } from '../Button';

export function FullDetailInfo({
  detail,
  setSelectedDetail
}: {
  detail: ITableDetail;
  setSelectedDetail: Dispatch<SetStateAction<ITableDetail | null>>;
}) {
  console.log(detail);

  return (
    <Box sx={{ padding: '40px' }}>
      <Box sx={{ position: 'relative', marginLeft: 'auto', width: '15%' }}>
        <Button onClick={() => setSelectedDetail(null)}>Закрыть</Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          img: { width: '30%' },
          marginBottom: '24px'
        }}
      >
        <img src={detail?.measurementSchema?.schemaImage} alt={detail?.measurementCode} />
        <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 19, gap: '12px' }}>
          {detail.measurementSchema.imageDetails.map((imageDetail) => (
            <div>
              {imageDetail.schemePointerNumber} - {imageDetail.schemePointerDescription};
            </div>
          ))}
        </Box>
      </Box>
      <Grid container sx={{ border: '1px solid #aeaeae', padding: '0 12px' }}>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', padding: '6px 0' }}>
          Средства измерения
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            padding: '6px 0'
          }}
        >
          {detail.measurmentDevices?.map((device) => (
            <div>{device.name}</div>
          ))}
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', padding: '6px 0' }}>
          Вспомогательные средства
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            padding: '6px 0'
          }}
        >
          {detail.helperDevices.length ? detail.helperDevices.map((device) => <div>{device.name}</div>) : <div>-</div>}
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', padding: '6px 0' }}>
          Графическая интерпретация
        </Grid>
        {detail.graphicalInterpretation.length ? (
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '6px 0'
            }}
          >
            {detail.graphicalInterpretation.map((grphInt) => (
              <Box>
                <img src={grphInt.schemaImage} alt="Graphical interpretation" style={{ width: '60%' }} />
                {grphInt.imageDetails.map((item) => (
                  <div>
                    {item.schemePointerNumber} - {item.schemePointerDescription}
                  </div>
                ))}
              </Box>
            ))}
          </Grid>
        ) : (
          <div>-</div>
        )}
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', padding: '6px 0' }}>
          Основные источники погрешности измерения
        </Grid>
        {detail.errors.length ? (
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '6px 0'
            }}
          >
            {detail.errors.map((error) => (
              <div>{error.name}</div>
            ))}
          </Grid>
        ) : (
          <div>-</div>
        )}
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', padding: '6px 0', fontWeight: 'bold' }}>
          Коды решения измерительных задач
        </Grid>
        {detail.taskCodes.length ? (
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '6px 0',
              fontWeight: 'bold'
            }}
          >
            {detail.taskCodes.map((taskCode) => (
              <div>{taskCode}</div>
            ))}
          </Grid>
        ) : (
          <div>-</div>
        )}
      </Grid>
      <Button sx={{ marginTop: '20px' }} onClick={() => setSelectedDetail(null)}>
        Закрыть
      </Button>
    </Box>
  );
}
