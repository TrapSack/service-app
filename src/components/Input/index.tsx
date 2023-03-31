import { InputBase } from '@mui/material';
import { borderRadius, Box, SxConfig, SxProps, Theme } from '@mui/system';
import React from 'react';

type InputProps = Required<
  Pick<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'placeholder' | 'name' | 'onChange' | 'value' | 'type'
  >
> & {
  sx?: SxProps<Theme>;
};

export function Input({ name, onChange, placeholder, type, value, sx }: InputProps) {
  const defaultStyleConfig: SxProps<Theme> = {
    width: '100%',
    'input::placeholder': {
      color: '#fff',
      fontSize: '16px'
    }
  };

  const styleConfig = Object.assign(defaultStyleConfig, sx);

  return (
    <Box
      sx={{
        padding: '12px 24px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '4px'
      }}
    >
      <InputBase name={name} onChange={onChange} placeholder={placeholder} type={type} value={value} sx={styleConfig} />
    </Box>
  );
}
