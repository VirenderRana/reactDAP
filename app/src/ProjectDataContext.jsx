import React from 'react';

const ProjectDataContext = React.createContext({
  projectData: {},
  setProjectData: () => {}
});

export default ProjectDataContext;