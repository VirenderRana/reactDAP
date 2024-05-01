import React, { useState } from 'react';
import { Box, Button, Divider, Modal } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import GroupsIcon from '@mui/icons-material/Groups';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateNewProject from '../../pages/createNewProject';

const Leftsidebar = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleNewButtonClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box display='flex' flexDirection='row'>
      <Box
        width='200px'
        position='fixed'
        sx={{ backgroundColor: 'white' }}
      >
        <Box display="flex" flexDirection="column" gap='20px' justifyContent="center">
          <Box
            height='30px'
            width="80%"
            sx={{
              backgroundColor: 'lightgrey',
              display: 'flex',
              flexDirection: 'row',
              marginLeft: '10px',
            }}
          >
            <HomeIcon sx={{ marginLeft: '5px', marginTop: '3px' }} />
            <Button variant="text" sx={{ color: 'black', marginTop: '3px' }}>
              Home
            </Button>
          </Box>
          <Button
            variant="contained"
            sx={{
              borderRadius: '30%',
              backgroundColor: 'blue',
              color: 'white',
              minWidth: 0,
              width: '50px',
              marginLeft: '15px',
            }}
            onClick={handleNewButtonClick}
          >
            New
          </Button>
          <Box
            height='30px'
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <SearchIcon sx={{ marginLeft: '5px', marginTop: '3px' }} />
            <Button variant="text" sx={{ color: 'black', marginTop: '3px' }}>
              Search
            </Button>
          </Box>
          <Box
            height='30px'
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <SaveIcon sx={{ marginLeft: '5px', marginTop: '3px' }} />
            <Button variant="text" sx={{ color: 'black', marginTop: '3px' }}>
              Save
            </Button>
          </Box>
          <Box
            height='30px'
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <InfoIcon sx={{ marginLeft: '5px', marginTop: '3px' }} />
            <Button variant="text" sx={{ color: 'black', marginTop: '3px' }}>
              Info
            </Button>
          </Box>
          <Box
            height='30px'
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <InsertDriveFileIcon sx={{ marginLeft: '4px', marginTop: '3px' }} />
            <Box sx={{ color: 'black', marginTop: '3px' }}>Your Files</Box>
          </Box>
          <Box
            height='30px'
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <GroupsIcon sx={{ marginLeft: '5px', marginTop: '3px' }} />
            <Box sx={{ color: 'black', marginTop: '3px', marginLeft: '2px' }}>
              Shared Files
            </Box>
          </Box>
          <Box
            height='30px'
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <DeleteIcon sx={{ marginLeft: '4px', marginTop: '3px' }} />
            <Box sx={{ color: 'black', marginTop: '3px' }}>Deleted</Box>
          </Box>
        </Box>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            display="flex"
            justifyContent="center"
            marginTop="50px"
            maxHeight="100vh"
            sx={{ overflowY: "scroll" }}
          >
            <CreateNewProject setOpenModal={setOpenModal} />
          </Box>
        </Modal>
      </Box>
      <Divider orientation="vertical" flexItem />
    </Box>
  );
};

export default Leftsidebar;
