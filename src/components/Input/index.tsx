import { InputBase, InputBaseProps, Tooltip } from '@mui/material';
import { borderRadius, Box, SxConfig, SxProps, Theme } from '@mui/system';
import React, { useState } from 'react';

type InputProps = Required<
  Pick<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'placeholder' | 'name' | 'onChange' | 'value' | 'type'
  >
> & {
  sx?: SxProps<Theme>;
} & InputBaseProps;

export function Input({ name, onChange, placeholder, type, value, sx, ...other }: InputProps) {
  const [openToolTip, setOpenToolTip] = useState(false);

  const defaultStyleConfig: SxProps<Theme> = {
    width: '100%',
    paddingInline: 2,
    border: '1px solid #000',
    'input::placeholder': {
      color: '#fff',
      fontSize: '16px'
    }
  };

  const styleConfig = Object.assign(defaultStyleConfig, sx);

  const onTooltipOpen = () => {
    setOpenToolTip(true);
  };

  const onTooltipClose = () => {
    setOpenToolTip(false);
  };

  return (
    <Tooltip
      open={openToolTip}
      title="PZASKALSJGPSGPKASPOKGPAGSOKPASGOPKGASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS"
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px'
        }}
      >
        <InputBase
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
          sx={styleConfig}
          onFocus={onTooltipOpen}
          onBlur={onTooltipClose}
          {...other}
        />
      </Box>
    </Tooltip>
  );
}
