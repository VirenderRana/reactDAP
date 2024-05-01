import React, { useContext } from 'react';
import { Box, Divider, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Aeis from '../../assets/Aeis.png';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HomeIcon from '@mui/icons-material/Home';
import ProjectDataContext from '../../ProjectDataContext';

const HeaderEditor = () => {
    const { projectData } = useContext(ProjectDataContext);
    let navigate = useNavigate();
    const projectTitle = projectData.projectName;

    function handleClose() {
        navigate('/');
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
            sx={{
                width: '100%',
                borderBottom: '1px solid #ccc',
            }}
        >
            <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                paddingY={1}
            >
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    width='190px'
                    borderRadius={2}
                    sx={{ padding: 1 }}
                >
                    <img src={Aeis} alt="AEIS" width='148px' height='33px' />
                </Box>
                <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: 'divider' }} />
                <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    width='100%'
                    alignItems='center'
                    paddingLeft='5px'
                    paddingRight='5px'
                >
                    <Box
                        display='flex'
                        flexDirection='row'
                        minWidth='170px'
                        maxWidth='100%'
                        justifyContent='start'
                        alignItems='center'
                        gap={2}
                    >
                        <HomeIcon sx={{ color: '#fff' }} />
                        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', color: '#000' }}>Project: {projectTitle}</Box>
                        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', color: '#000' }}>({projectData.siteName})</Box>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        width='auto'
                        gap='5px'
                        sx={{ padding: 1 }}
                    >
                        <IconButton color="inherit">
                            <MoreHorizIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={handleClose}>
                            <HighlightOffIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HeaderEditor;
