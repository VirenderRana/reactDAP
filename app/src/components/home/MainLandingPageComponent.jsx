import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import ExtFileComponent from '../ExtFileComponent';

const MainLandingPageComponent = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/projects/');
        const data = await response.json();
        const validProjects = data.filter(project => project.title != null);
        setProjects(validProjects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Box display="flex" flexDirection="column" marginTop="10px" marginLeft="150px">
      <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%" marginLeft="50px">
        <Box display="flex" flexDirection="column" paddingBottom="5px" marginLeft="20px" height="30px">
          <Box>Recent</Box>
          <Box display="flex" flexDirection="row" width="20px">
            <Box>Sort</Box>
            <KeyboardArrowDownIcon />
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" gap="10px" justifyContent="flex-end">
          <FormatListBulletedIcon />
          <GridViewIcon />
        </Box>
      </Box>
      <Box display="inline-flex" flexDirection="row" gap="10px" marginTop="10px" flexWrap="wrap" maxWidth="1200px" marginLeft="60px" marginRight="100px" overflow="hidden">
        {projects.map((project, index) => (
          <ExtFileComponent
            filename={project.title}
            createdAt={project.edition}
            key={index}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MainLandingPageComponent;
