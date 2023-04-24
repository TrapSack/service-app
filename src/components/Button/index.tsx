import { ButtonBase, ButtonBaseProps, CircularProgress, SxProps, Theme } from '@mui/material';
import { useMemo } from 'react';

type ButtonType = 'default';

type ButtonProps = Pick<ButtonBaseProps, 'onClick' | 'type' | 'sx'> & {
  title?: string;
  children?: Element | Element[] | string;
  buttonType?: ButtonType;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export function Button({
  children,
  onClick,
  title,
  type,
  sx,
  buttonType = 'default',
  isLoading,
  size = 'md'
}: ButtonProps) {
  const buttonSize = {
    padding: size === 'sm' ? '8px 0' : '12px 0',
    width: size === 'sm' ? '60%' : '100%'
  };

  const defaultButton: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#434C57',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '18px',
    transition: 'all 0.2s ease',

    '&:hover': {
      backgroundColor: '#2E353E'
    }
  };
  const buttonStyle = useMemo(() => {
    switch (buttonType) {
      case 'default':
        return defaultButton;
      default:
        return defaultButton;
    }
  }, [buttonType]);

  const style = Object.assign(buttonStyle, sx, buttonSize);

  return (
    <ButtonBase onClick={onClick} type={type} sx={style}>
      {children || title || ''}
      {isLoading && <CircularProgress />}
    </ButtonBase>
  );
}
