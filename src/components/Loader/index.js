import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader({height}) {
  return (
    <Stack sx={{ color: 'grey.500'}} className={height === '90vh'?'loader_width default_style':'default_style'}  spacing={2} direction="row">
      <CircularProgress color="inherit" />
    </Stack>
  );
}
