import React, { useState } from 'react';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Pdf from '../../assets/PDF.svg';

const TemplateCard = ({ id, title, refreshConfigs }) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleEditModalOpen = () => {
      setOpenEditModal(true);
    };

    const handleEditModalClose = () => {
      setOpenEditModal(false);
    };

    const handleDeleteModalOpen = () => {
      setOpenDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/configmodels/${id}/`, {
              method: 'DELETE',
            });
            if (response.ok) {
              console.log("Template deleted successfully");
              refreshConfigs();  // Call the function passed via props
            } else {
              throw new Error('Failed to delete the template');
            }
          } catch (error) {
            console.error('Error deleting template:', error);
          }
          handleDeleteModalClose();  // Close the modal after the operation
    };

    const handleDeleteModalClose = () => {
      setOpenDeleteModal(false);
    };

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      minWidth='200px'
      maxWidth='400px'
      minHeight='100px'
      maxHeight='200px'
      sx={{
        border: '1px solid silver',
        borderRadius: 0,
      }}
    >
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
      >
        <Box display='flex' flexDirection='row' gap='2px'>
          <Box fontWeight="bold">{title}</Box>
          <EditIcon onClick={handleEditModalOpen} />
        </Box>
        <DeleteIcon onClick={handleDeleteModalOpen} />
      </Box>
      <Box textAlign="left">
        <img src={Pdf} alt="PDF" width="20px" height="20px" />
      </Box>
      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={handleEditModalClose}>
        <DialogTitle>Edit Template</DialogTitle>
        <DialogContent>
          {/* Add your edit form components here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditModalClose} >Cancel</Button>
          <Button onClick={handleEditModalClose} sx={{backgroundColor: 'red', color: 'white'}}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={openDeleteModal} onClose={handleDeleteModalClose}>
        <DialogTitle>Delete Template</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this template?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteModalClose}>Cancel</Button>
          <Button onClick={handleDelete} sx={{backgroundColor: 'red', color: 'white'}}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TemplateCard;
