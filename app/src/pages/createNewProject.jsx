import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Divider, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ProjectDataContext from '../ProjectDataContext';

const CreateNewProject = ({ setOpenModal }) => {
  const navigate = useNavigate();
  const { control, register, handleSubmit, formState: { errors }, reset } = useForm();
  const [configs, setConfigs] = useState([]);
  const { setProjectData } = useContext(ProjectDataContext);

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/configmodels/');
        const data = await response.json();
        setConfigs(data);
      } catch (error) {
        console.error('Error fetching configurations:', error);
      }
    };
    fetchConfigs();
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onSubmit = (data) => {
    setProjectData(data);
    console.log(data);
    reset();
    navigate('/editor');
  };

  return (
    <Box justifyContent='center' alignItems='center'>
      <Box
        width='350px'
        bgcolor='#FFFFFF'
        borderRadius={5}
        padding={2}
        justifyContent='center'
        alignItems='center'
      >
        <Box display='flex' flexDirection='row' justifyContent='space-between'>
        <Typography variant="h6" gutterBottom>Create New Project</Typography>
          <HighlightOffIcon
            style={{ color: 'grey' }}
            id='exit'
            onClick={handleCloseModal}
          />
        </Box>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display='flex' flexDirection='column' padding={2} gap='30px'>
            <TextField
              fullWidth
              placeholder='Project Title'
              {...register('projectName', {
                required: 'Project Name is required',
                maxLength: 50
              })}
            />
            <TextField
              fullWidth
              placeholder='Site Name'
              {...register('siteName')}
            />
            <FormControl fullWidth>
              <InputLabel id="supermodel-label">Supermodel Type</InputLabel>
              <Select
                labelId="supermodel-label"
                {...register('supermodelType')}
              >
                <MenuItem value="Orthotropic">Orthotropic</MenuItem>
                <MenuItem value="Multistory Building">Multistory Building</MenuItem>
                <MenuItem value="Aviation Project">Aviation Project</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="config-selector-label">Select Configuration</InputLabel>
              <Select
                labelId="config-selector-label"
                defaultValue=""
                label="Select Configuration"
                {...register('config')}
              >
                {configs.map(config => (
                  <MenuItem key={config.id} value={config.mcc}>
                    {config.model_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: '#4CAF50', color: 'white' }}
            >
              Create Project
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CreateNewProject;
