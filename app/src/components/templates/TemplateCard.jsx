import React, { useState } from 'react';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';

const TemplateCard = ({ id, title, refreshConfigs }) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleEditModalOpen = () => setOpenEditModal(true);
    const handleEditModalClose = () => setOpenEditModal(false);
    const handleDeleteModalOpen = () => setOpenDeleteModal(true);
    const handleDeleteModalClose = () => setOpenDeleteModal(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/configmodels/${id}/`, { method: 'DELETE' });
            if (response.ok) {
              console.log("Template deleted successfully");
              refreshConfigs();
            } else {
              throw new Error('Failed to delete the template');
            }
        } catch (error) {
            console.error('Error deleting template:', error);
        }
        handleDeleteModalClose();
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 240,
            height: 150,
            m: 1,
            bgcolor: 'background.paper',
            boxShadow: 3,
            borderRadius: '12px',
            overflow: 'hidden',
            '&:hover': {
                boxShadow: 6,
            }
        }}>
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mt: 2, mx: 2 }}>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 1 }}>
                <SettingsIcon sx={{ fontSize: 40 }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', p: 1 }}>
                <Button startIcon={<SettingsIcon />} onClick={handleEditModalOpen}>
                    Edit
                </Button>
                <Button startIcon={<DeleteIcon />} onClick={handleDeleteModalOpen} color="error">
                    Delete
                </Button>
            </Box>

            {/* Edit Modal */}
            <Dialog open={openEditModal} onClose={handleEditModalClose}>
                <DialogTitle>Edit Template</DialogTitle>
                <DialogContent>
                    {/* Form components here */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditModalClose}>Cancel</Button>
                    <Button onClick={handleEditModalClose} color="primary">Save</Button>
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
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TemplateCard;
