import { ButtonBase, ButtonBaseProps, SxProps, Theme } from '@mui/material';
import { useMemo } from 'react';

type ButtonType = 'default';

type ButtonProps = Pick<ButtonBaseProps, 'onClick' | 'type' | 'sx'> & {
  title?: string;
  children?: Element | Element[] | string;
  buttonType?: ButtonType;
};

export function Button({ children, onClick, title, type, sx, buttonType = 'default' }: ButtonProps) {
  const defaultButton: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 0',
    backgroundColor: '#434C57',
    color: '#fff',
    borderRadius: '4px',
    width: '100%',
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

  const style = Object.assign(buttonStyle, sx);

  return (
    <ButtonBase onClick={onClick} type={type} sx={style}>
      {children || title || ''}
    </ButtonBase>
  );
}
