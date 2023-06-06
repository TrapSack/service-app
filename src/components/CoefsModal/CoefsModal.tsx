/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import { Modal, Typography, Box, FormControl, Checkbox, FormControlLabel, Stack } from '@mui/material';

import React, { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { ITableDetail } from 'src/api/interfaces';
import { ResultData } from '@Components/DetailsContainer/DetailsContainer';
import { useStyles } from './styles';
import { Button, Input } from '..';

export interface CoefsModalProps {
  handleClose: () => void;
  isOpen: boolean;
  details: ITableDetail[];
  setCalculatingResults: (data: ResultData[]) => void;
}

const CoefsModal = ({ handleClose, isOpen, details, setCalculatingResults }: CoefsModalProps) => {
  const classes = useStyles();
  const [priceCheckbox, setPriceCheckbox] = useState(true);
  const [accuracyCheckbox, setAccuracyCheckbox] = useState(true);
  const [techCheckbox, setTechCheckbox] = useState(true);
  const [simplicityCheckbox, setSimplicityCheckbox] = useState(true);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const result: ResultData[] = details.map((detail) => ({
      id: detail.id,
      props: {
        price: Number(values[`price-${detail.id}`]),
        accuracy: Number(values[`accuracy-${detail.id}`]),
        simplicity: Number(values[`simplicity-${detail.id}`]),
        tech: Number(values[`tech-${detail.id}`])
      }
    }));

    setCalculatingResults(result);
  };

  const mergedInitialValues = useMemo(() => {
    const mergedDetails = details.reduce((acc: { [key: string]: number }, d) => {
      acc[`price-${d.id}`] = 0;
      acc[`accuracy-${d.id}`] = 0;
      acc[`simplicity-${d.id}`] = 0;
      acc[`tech-${d.id}`] = 0;
      return acc;
    }, {});

    return mergedDetails;
  }, [details]);

  const { values, handleChange } = useFormik({
    initialValues: mergedInitialValues,
    onSubmit: handleSubmit
  });

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={classes.modal}>
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <FormControlLabel
              control={
                <Checkbox
                  value={priceCheckbox}
                  checked={priceCheckbox}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPriceCheckbox(event.target.checked);
                  }}
                />
              }
              label="Стоимость"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={accuracyCheckbox}
                  checked={accuracyCheckbox}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setAccuracyCheckbox(event.target.checked);
                  }}
                />
              }
              label="Точность"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={simplicityCheckbox}
                  checked={simplicityCheckbox}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setSimplicityCheckbox(event.target.checked);
                  }}
                />
              }
              label="Протота конструктивного исполнения"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={techCheckbox}
                  checked={techCheckbox}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setTechCheckbox(event.target.checked);
                  }}
                />
              }
              label="Технологичность"
            />
          </FormControl>
          {details.map((d) => (
            <Box sx={{ borderBottom: '1px solid grey', p: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <img src={d.measurementSchema.schemaImage} id={d.measurementSchema.schemaImage} alt="" />
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',

                  columnGap: 4
                }}
              >
                {priceCheckbox ? (
                  <Box>
                    <Typography>Цена</Typography>
                    <Input
                      inputProps={{
                        min: 0,
                        max: 1,
                        step: 0.1
                      }}
                      value={values[`price-${d.id}`]}
                      defaultValue={0}
                      name={`price-${d.id}`}
                      onChange={handleChange}
                      placeholder="Цена"
                      type="number"
                    />
                  </Box>
                ) : null}
                {accuracyCheckbox ? (
                  <Box>
                    <Typography>Точность</Typography>
                    <Input
                      inputProps={{
                        min: 0,
                        max: 1,
                        step: 0.1
                      }}
                      value={values[`accuracy-${d.id}`]}
                      defaultValue={0}
                      name={`accuracy-${d.id}`}
                      onChange={handleChange}
                      placeholder="Точность"
                      type="number"
                    />
                  </Box>
                ) : null}
                {simplicityCheckbox ? (
                  <Box>
                    <Typography>Протота конструктивного исполнени</Typography>
                    <Input
                      inputProps={{
                        min: 0,
                        max: 1,
                        step: 0.1
                      }}
                      value={values[`simplicity-${d.id}`]}
                      defaultValue={0}
                      name={`simplicity-${d.id}`}
                      onChange={handleChange}
                      placeholder="Протота конструктивного исполнения"
                      type="number"
                    />
                  </Box>
                ) : null}
                {techCheckbox ? (
                  <Box>
                    <Typography>Технологичность</Typography>
                    <Input
                      inputProps={{
                        min: 0,
                        max: 1,
                        step: 0.1
                      }}
                      value={values[`tech-${d.id}`]}
                      name={`tech-${d.id}`}
                      defaultValue={0}
                      onChange={handleChange}
                      placeholder="Технологичность"
                      type="number"
                    />
                  </Box>
                ) : null}
              </Box>
            </Box>
          ))}
          <Stack display="flex" flexDirection="row" alignItems="center" justifyContent="center" mt={3}>
            <Button
              sx={{
                width: 120,
                height: 50
              }}
              size="sm"
              type="submit"
            >
              Рассчитать
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default CoefsModal;
