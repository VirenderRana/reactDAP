import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';

const AddNewTemplate = ({ setOpenModal }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [fields, setFields] = useState([]);
  const [configs, setConfigs] = useState([]);
const [selectedConfigs, setSelectedConfigs] = useState([]);
const [isLoadingConfigs, setIsLoadingConfigs] = useState(false);

    useEffect(() => {
        const fetchConfigs = async () => {
        setIsLoadingConfigs(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/configmodels/');
            const data = await response.json();
            setConfigs(data);
        } catch (error) {
            console.error('Failed to fetch configurations', error);
        }
        setIsLoadingConfigs(false);
        };
    
        fetchConfigs();
        console.log(configs);

    }, []);

    const handleSelectConfig = (config) => {
        if (!selectedConfigs.some(selected => selected.id === config.id)) {
          setSelectedConfigs([...selectedConfigs, config]);
        }
      };
      
      const handleDeselectConfig = (configId) => {
        setSelectedConfigs(selectedConfigs.filter(config => config.id !== configId));
      };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onsubmit = async (data) => {
    const fieldsData = fields.map(field => ({
        name: field.fieldName,
        type: field.fieldType
      }));
    
      const associatedConfigs = selectedConfigs.map(config => ({
        name: config.model_name,
        mcc: config.mcc
      }));
    
      try {
        const response = await fetch('http://127.0.0.1:8000/api/configmodels/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model_name: data.modelName,
            fields_data: fieldsData,
            associated_configs: associatedConfigs  // Add this line to include associated configs in the request
          })
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        console.log(result);
        console.log(configs);
        reset();
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    console.log(data);
    reset();
    handleCloseModal();
  };

  const addField = () => {
    setFields([...fields, { fieldName: '', fieldType: '' }]);
  };

  const handleFieldChange = (index, type, value) => {
    const newFields = fields.map((field, i) => {
      if (i === index) {
        return { ...field, [type]: value };
      }
      return field;
    });
    setFields(newFields);
  };

  return (
    <Box
      width={853}
      bgcolor={'#FFFFFF'}
      borderRadius={5}
      padding={2}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ borderBottom: '1px solid silver' }}
      >
        <h1 style={{ textAlign: 'left', margin: 5 }}>Create New Model Configuration</h1>
        <IconButton
          onClick={handleCloseModal}
          color="inherit"
        >
          <HighlightOffIcon />
        </IconButton>
      </Box>

      <form onSubmit={handleSubmit(onsubmit)}>
        <Box display='flex' flexDirection='column' padding={2} gap='20px'>
          <TextField
            fullWidth
            label="Model Name"
            {...register('modelName', { required: true })}
            error={!!errors.modelName}
            helperText={errors.modelName ? 'Model name is required' : ''}
          />
          {fields.map((field, index) => (
            <Box key={index} display="flex" gap="10px">
              <TextField
                label="Field Name"
                value={field.fieldName}
                onChange={(e) => handleFieldChange(index, 'fieldName', e.target.value)}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Field Type</InputLabel>
                <Select
                  value={field.fieldType}
                  label="Field Type"
                  onChange={(e) => handleFieldChange(index, 'fieldType', e.target.value)}
                >
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="image">Image</MenuItem>
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="3d">3D File</MenuItem>
                  <MenuItem value="json">JSON File</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={addField}
            variant="contained"
          >
            Add Field
          </Button>
          <Box display="flex" flexDirection="column" gap="10px">
            {isLoadingConfigs ? (
                <p>Loading configurations...</p>
            ) : (
                configs.map((config) => (
                <Box key={config.id} display="flex" justifyContent="space-between" alignItems="center">
                    <p>{config.model_name} - MCC: {config.mcc}</p>
                    <Button
                    variant="contained"
                    color={selectedConfigs.some(selected => selected.id === config.id) ? "secondary" : "primary"}
                    onClick={() => selectedConfigs.some(selected => selected.id === config.id) ? handleDeselectConfig(config.id) : handleSelectConfig(config)}
                    >
                    {selectedConfigs.some(selected => selected.id === config.id) ? 'Deselect' : 'Select'}
                    </Button>
                </Box>
                ))
            )}
            </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: '#4CAF50', color: 'white', mt: 2 }}
          >
            Create
          </Button>
          <Button variant="contained" onClick={handleCloseModal} sx={{ mt: 2 }}>Cancel</Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddNewTemplate;
