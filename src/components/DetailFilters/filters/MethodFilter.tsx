import { Button } from '@Components/Button';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { methods } from './consts';

const initialStage = {
  type: 0,
  diversity: 0,
  group: 0,
  class: 0,
  view: 0
};

type Method = typeof initialStage;

const methodClearField = {
  type: {},
  diversity: {
    type: 0
  },
  group: {
    type: 0,
    diversity: 0,
    class: 0,
    view: 0
  },
  class: {
    type: 0,
    diversity: 0,
    view: 0
  },
  view: {
    type: 0,
    diversity: 0
  }
};

const numsToSymbols = new Map(
  Object.entries({
    1: 'А',
    2: 'Б',
    3: 'В',
    4: 'Г',
    5: 'Д'
  })
);
const numsToSymbolsLC = new Map(
  Object.entries({
    1: 'а',
    2: 'б',
    3: 'в',
    4: 'г',
    5: 'д'
  })
);

const getResultString = (methodValues: Method) => {
  const type = numsToSymbolsLC.get(methodValues.type.toString().toLowerCase()) || '0';
  const diversity = numsToSymbols.get(methodValues.diversity.toString()) || '0';

  return `${methodValues.group}-${methodValues.class}-${methodValues.view}-${diversity}-${type}`;
};

export function MethodFilter({ setCodeString }: { setCodeString: Dispatch<SetStateAction<string | null>> }) {
  const [methodValues, setMethodValues] = useState(initialStage);

  const [groupSelectValues, classSelectValues, viewSelectValues, diversitySelectValues, typeSelectValues] =
    useMemo(() => {
      const groupSelectValues = methods.map((m) => ({ title: m.name, value: m.value }));
      let classSelectValues: { title: string; value: number }[] = [];
      let viewSelectValues: { title: string; value: number }[] = [];
      let diversitySelectValues: { title: string; value: number }[] = [];
      let typeSelectValues: { title: string; value: number }[] = [];

      if (methodValues.group) {
        const foundMethod = methods.find((m) => m.value === Number(methodValues.group));

        if (foundMethod) {
          classSelectValues = foundMethod.children.map((cls) => ({ title: cls.name, value: cls.value }));

          if (methodValues.class) {
            const foundClass = foundMethod.children.find((cls) => cls.value === methodValues.class);

            if (foundClass && foundClass.children) {
              viewSelectValues = foundClass.children.map((v) => ({ title: v.name, value: v.value }));

              const foundView = foundClass.children.find((v) => v.value === methodValues.view);

              if (foundView && foundView?.children) {
                diversitySelectValues = foundView?.children.map((d) => ({ title: d.name, value: d.value }));

                const foundDiversity = foundView.children.find((d) => d.value === methodValues.diversity);

                if (foundDiversity && foundDiversity.children) {
                  typeSelectValues = foundDiversity.children.map((t) => ({ title: t.name, value: t.value }));
                }
              }
            }
          }
        }
      }

      return [groupSelectValues, classSelectValues, viewSelectValues, diversitySelectValues, typeSelectValues];
    }, [methodValues]);

  const handleChangeMethod = (e: SelectChangeEvent<number>, type: keyof typeof methodValues) => {
    // eslint-disable-next-line no-undef
    const nnnmethodValues = structuredClone(methodValues);
    const newMethodValues = Object.assign(nnnmethodValues, { ...methodClearField[type], [type]: e.target.value });

    setMethodValues(newMethodValues);
  };

  const onClick = () => {
    const code = getResultString(methodValues);
    setCodeString(code);
  };

  return (
    <Box>
      <Box>Введите код МВИ</Box>
      <form>
        <Box sx={{ display: 'flex', gap: '12px', mt: '20px' }}>
          <FormControl sx={{ width: '10%' }}>
            <InputLabel id="group">Группа</InputLabel>
            <Select
              labelId="group"
              id="group132"
              value={methodValues.group}
              sx={{ width: '100%' }}
              label="Группа"
              onChange={(e) => handleChangeMethod(e, 'group')}
            >
              {groupSelectValues.map((value) => (
                <MenuItem value={value.value}>{value.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: '10%' }}>
            <InputLabel id="class">Класс</InputLabel>
            <Select
              labelId="class"
              id="class"
              value={methodValues.class}
              sx={{ width: '100%' }}
              label="Класс"
              onChange={(e) => handleChangeMethod(e, 'class')}
              disabled={!methodValues.group}
            >
              {classSelectValues.map((value) => (
                <MenuItem value={value.value}>{value.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: '10%' }}>
            <InputLabel id="view">Вид</InputLabel>
            <Select
              labelId="view"
              id="view"
              value={methodValues.view}
              sx={{ width: '100%' }}
              label="Вид"
              disabled={!methodValues.class}
              onChange={(e) => handleChangeMethod(e, 'view')}
            >
              {viewSelectValues.map((value) => (
                <MenuItem value={value.value}>{value.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: '10%' }}>
            <InputLabel id="diversity">Разновидность</InputLabel>
            <Select
              labelId="diversity"
              id="diversity"
              value={methodValues.diversity}
              sx={{ width: '100%' }}
              label="Разновидность"
              disabled={!methodValues.view}
              onChange={(e) => handleChangeMethod(e, 'diversity')}
            >
              {diversitySelectValues.map((value) => (
                <MenuItem value={value.value}>{value.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: '10%' }}>
            <InputLabel id="type">Тип</InputLabel>
            <Select
              labelId="type"
              id="type"
              value={methodValues.type}
              sx={{ width: '100%' }}
              label="Тип"
              disabled={!methodValues.diversity}
              onChange={(e) => handleChangeMethod(e, 'type')}
            >
              {typeSelectValues.map((value) => (
                <MenuItem value={value.value}>{value.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Typography>{getResultString(methodValues)}</Typography>
        <Button sx={{ mt: '20px' }} onClick={onClick}>
          Применить фильтры
        </Button>
      </form>
    </Box>
  );
}
