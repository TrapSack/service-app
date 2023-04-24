import { Box } from '@mui/system';
import { ITableDetail } from 'src/api/interfaces';
import { Button } from '@Components/index';

export function SingleDetail({
  detail,
  setSelectedDetail
}: {
  detail: ITableDetail;
  setSelectedDetail: (detail: ITableDetail) => void;
}) {
  return (
    <Box
      sx={{
        padding: '11px 13px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: '#f0efef',
        borderRadius: '8px',
        border: '1px solid #d8d8d8',
        height: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          img: { width: '80%' }
        }}
      >
        <img src={detail.measurementSchema.schemaImage} alt="Schema" />
        {/* {detail.measurementSchema?.imageDetails?.length &&
          detail.measurementSchema.imageDetails?.map((imageDetail, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={index}>
              {imageDetail.schemePointerNumber} - {imageDetail.schemePointerDescription}
            </Box>
          ))} */}
      </Box>
      <Box fontSize={18}>{detail.measurementCode}</Box>
      <Button size="sm" onClick={() => setSelectedDetail(detail)}>
        Открыть
      </Button>
    </Box>
  );
}
