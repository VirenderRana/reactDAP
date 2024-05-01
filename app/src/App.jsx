import './App.css'
import ProjectDataContext from './ProjectDataContext';
import React, { useState} from 'react';
// import LoginPage from './pages/LoginPage';
// import CreateNewProject from './pages/createNewProject';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';

const theme = createTheme({
  // your theme options
});
function App() {
  const [projectData, setProjectData] = useState({});

  return (
    <ProjectDataContext.Provider value={{ projectData, setProjectData }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/editor" element={<EditorPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ProjectDataContext.Provider>
    
  )
}

export default App
