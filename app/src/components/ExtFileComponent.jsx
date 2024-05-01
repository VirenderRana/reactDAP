import React from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box } from '@mui/system';

const ExtFileComponent = ({ filename, createdAt }) => {
  return (
    <Box width="190px" height="238px" display="flex" flexDirection="column">
      <Box
        display="flex"
        height="190px"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: 'lightgray' }}
      >
        <InsertDriveFileIcon
          sx={{ color: 'white', width: '60%', height: '60%' }}
        />
      </Box>
      <Box textAlign="left" fontWeight="bold">
        {filename}
      </Box>
      <Box textAlign="left">
        {createdAt}
      </Box>
    </Box>
  );
};

export default ExtFileComponent;
