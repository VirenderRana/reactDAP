import React, { useState, useEffect } from 'react';
import { Box, Modal } from '@mui/material';
import TemplateCard from './TemplateCard';
import AddNewTemplate from './Addtemplate';

const Template = () => {
  const [openModal, setOpenModal] = useState(false);
  const [configs, setConfigs] = useState([]);  // State to store the configurations

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/configmodels/');
        const data = await response.json();
        setConfigs(data);
      } catch (error) {
        console.error('Failed to fetch configurations:', error);
      }
    };

    fetchConfigs();
  }, []);

  const handleNewButtonClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const refreshConfigs = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/configmodels/');
      const data = await response.json();
      setConfigs(data);
    } catch (error) {
      console.error('Failed to fetch configurations:', error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      marginTop={'10px'}
      marginLeft={'200px'}
      gap={'15px'}
      minWidth={'500px'}
    >
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
      >
        <Box>My Configurations ({configs.length})</Box>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems="center"
          justifyContent="center"
          height={"40px"}
          color={'#E22A34'}
          bgcolor={'rgb(254, 246, 243)'}
          sx={{
            '&:hover': {
              color: '#E22A34',
              backgroundColor: 'rgb(254, 246, 243)',
              cursor: 'pointer',
            },
            borderRadius: '8px',
            gap: '10px',
          }}
          onClick={handleNewButtonClick}
        >
          <Box maxWidth={'250px'} sx={{ whiteSpace: 'nowrap' }}>
            Create New Configuration
          </Box>
        </Box>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'row'}
        gap={'20px'}
        flexWrap={'wrap'}
      >
        {configs.map(config => (
          <TemplateCard
            key={config.id}
            id={config.id}
            title={`${config.model_name}`}
            refreshConfigs={refreshConfigs}
          />
        ))}
      </Box>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          maxHeight={'100vh'}
        >
          <AddNewTemplate setOpenModal={setOpenModal} />
        </Box>
      </Modal>
    </Box>
  );
};

export default Template;
