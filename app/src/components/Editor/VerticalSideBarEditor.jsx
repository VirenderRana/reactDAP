import React from 'react';
import { Box, Divider, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/system';

// Custom styled Box component for the sidebar
const SidebarContainer = styled(Box)(({ theme }) => ({
  top: '80px',
  width: '64px', // Adjust the width as per your design
  height: '100vh', // Full height
  backgroundColor: theme.palette.background.paper, // Or any color you prefer
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start', // Start from the top
  paddingTop: theme.spacing(2), // Adjust the padding at the top
  borderRight: '1px solid rgba(0, 0, 0, 0.12)', // Add border to the right
}));

const VerticalSideBarEditorComponent = () => {
  return (
    <SidebarContainer>
      <IconButton color="inherit">
        <HomeIcon />
      </IconButton>
      <IconButton color="inherit">
        <SearchIcon />
      </IconButton>
      <IconButton color="inherit">
        <SaveIcon />
      </IconButton>
      <IconButton color="inherit">
        <InfoIcon />
      </IconButton>
      <Divider orientation="horizontal" flexItem sx={{ width: '100%', marginY: 2 }} />
      {/* Add more icons as needed */}
    </SidebarContainer>
  );
};

export default VerticalSideBarEditorComponent;
