export const useStyles = () => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    boxShadow: 24,
    border: 'none',
    width: '60vw',
    minHeight: '70vh',
    overflowY: 'scroll',
    p: 4,
    '& form': {
      overflowY: 'scroll',
      height: '70vh',
      pb: 4
    }
  }
});
