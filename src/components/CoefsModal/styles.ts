export const useStyles = () => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'white',
    boxShadow: 24,
    border: 'none',
    minHeight: 400,
    overflowY: 'scroll',
    p: 4,
    '& form': {
      overflowY: 'scroll',
      height: 400,
      pb: 4
    }
  }
});
