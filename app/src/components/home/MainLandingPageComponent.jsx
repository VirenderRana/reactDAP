import React from 'react';
import { Box } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import ExtFileComponent from '../ExtFileComponent';
import { generateExtfiledataArrays } from '../../Constants/constants';

const MainLandingPageComponent = () => {
  return (
    <Box display="flex" flexDirection="column"  marginTop="10px" marginLeft="150px">
      <Box display="flex" flexDirection="row" sx={{justifyContent:'space-between'}} marginLeft="50px" minWidth={0}>
        <Box
          display="flex"
          flexDirection="column"
          paddingBottom="5px"
          marginLeft="20px"
          height="30px"
        >
          <Box>Recent</Box>
          <Box display="flex" flexDirection="row" width="20px">
            <Box>Sort</Box>
            <KeyboardArrowDownIcon />
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" width="50px">
          <FormatListBulletedIcon />
          <GridViewIcon />
        </Box>
      </Box>
      <Box display="inline-flex" flexDirection="row" gap="10px" marginTop="10px" flexWrap="wrap" maxWidth="1200px" marginLeft="60px" marginRight="100px" overflow="hidden">
        {
          generateExtfiledataArrays().map((extfiledataArray, index) => (
            <Box display="flex" flexDirection="row" gap="10px" key={index}>
              {extfiledataArray.map((extfiledata, subIndex) => (
                <ExtFileComponent
                  filename={extfiledata.filename}
                  createdAt={extfiledata.createdAt}
                  key={subIndex}
                />
              ))}
            </Box>
          ))
        }
      </Box>
    </Box>
  );
};

export default MainLandingPageComponent;
