import React, { useState } from 'react';
import { Box } from '@mui/system';
import Aeis from '../../assets/Aeis.png';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';


const HeaderHome = ({ onClickPath }) => {
    
  return (
    <Box
      display={'flex'}
      width={'100%'}
      flexDirection={'row'}
      flexGrow={1}
      position={'sticky'}
      top={0}
      zIndex={100}
      sx={{backgroundColor: 'white', borderBottom: '1px solid #E0E0E0'}}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'190px'}
      >
        <img src={Aeis} alt="AEIS" width={'120px'} height={'40px'} />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        width={'300px'}
        flexGrow={1}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={'50px'}
          marginLeft={'10px'}
        >
          <Box
            display={'flex'}
            flexDirection={'row'}
            gap={'10px'}
            alignItems="center"
            justifyContent="center"
            sx={{
              '&:hover': {
                color: '#E22A34',
                backgroundColor: 'rgb(254, 246, 243)',
                cursor: 'pointer',
              },
              width: '150px',
              height: '50px',
              borderRadius: '8px',
            }}
            onClick={() => onClickPath("Dashboard")}
          >
            <DashboardIcon />
            <Box>Dashboard</Box>
          </Box>
          <Box
              display={"flex"}
              flexDirection={"row"}
              gap={"10px"}
              alignItems="center"
              justifyContent="center"
              sx={{
                "&:hover": {
                  color: "#E22A34",
                  backgroundColor:'rgb(254, 246, 243)',
                  cursor: 'pointer',
                },
                width: '150px',
                height: '50px',
                borderRadius: '8px',
              }}
              onClick={() => onClickPath("Folders")}
          >
            <FolderIcon />
            <Box>Folders</Box>
          </Box>
          <Box
              display={"flex"}
              flexDirection={"row"}
              gap={"10px"}
              alignItems="center"
              justifyContent="center"
              sx={{
                "&:hover": {
                  color: "#E22A34",
                  backgroundColor:'rgb(254, 246, 243)',
                  cursor: 'pointer',
                },
                width: '150px',
                height: '50px',
                borderRadius: '8px',
              }}
              onClick={() => onClickPath("ManageTemplates")}
          >
            <Box>Manage Configs</Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          flexGrow={1}
        >
          <HelpOutlineIcon />
          <NotificationsNoneIcon />
          <CloudQueueIcon />
          <AccountCircleIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderHome;
