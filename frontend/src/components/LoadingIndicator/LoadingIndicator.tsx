import { CircularProgress } from '@mui/material';

export const LoadingIndicator = () => {
  return (
    <CircularProgress
      size={60}
      sx={{ position: 'absolute', top: 'calc(50% - 30px)', left: 'calc(50% - 30px)' }}
    />
  );
};
