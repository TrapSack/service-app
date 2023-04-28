import { Button } from '@Components/Button';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/system';
import { useMemo, useState } from 'react';
import { methods } from './consts';

export function MethodFilter() {
  const [methodValues, setMethodValues] = useState({
    group: '',
    class: '',
    view: ''
  });

  const [groupSelectValues, classSelectValues, viewSelectValues] = useMemo(() => {
    const groupSelectValues = methods.map((m) => ({ title: m.name, value: m.value }));
    let classSelectValues: { title: string; value: number }[] = [];
    let viewSelectValues: { title: string; value: number }[] = [];

    if (methodValues.group) {
      const foundMethod = methods.find((m) => m.value === Number(methodValues.group));

      if (foundMethod) {
        classSelectValues = foundMethod.children.map((cls) => ({ title: cls.name, value: cls.value }));

        if (methodValues.class) {
          const foundClass = foundMethod.children.find((cls) => cls.value === Number(methodValues.class));

          if (foundClass) {
            viewSelectValues = foundClass.children.map((v) => ({ title: v.name, value: v.value }));
          }
        }
      }
    }

    return [groupSelectValues, classSelectValues, viewSelectValues];
  }, [methodValues]);

  const handleChangeMethod = (e: SelectChangeEvent<string>, type: 'group' | 'class' | 'view') => {
    console.log(e.target.value);
    setMethodValues((prev) => ({
      group: type === 'group' ? e.target.value : prev.group,
      // eslint-disable-next-line no-nested-ternary
      class: type === 'class' ? e.target.value : type === 'group' ? '' : prev.class,
      // eslint-disable-next-line no-nested-ternary
      view: type === 'view' ? e.target.value : type === 'group' || type === 'class' ? '' : prev.view
    }));
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
              label="Группа"
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
              label="Группа"
              disabled={!methodValues.class}
              onChange={(e) => handleChangeMethod(e, 'view')}
            >
              {viewSelectValues.map((value) => (
                <MenuItem value={value.value}>{value.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button sx={{ mt: '20px' }}>Применить фильтры</Button>
      </form>
    </Box>
  );
}
