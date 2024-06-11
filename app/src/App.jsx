import './App.css'
import { ProjectDataContext, ProjectDataContextProvider } from './ProjectDataContext';
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

  return (
    <ProjectDataContextProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/editor" element={<EditorPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ProjectDataContextProvider>
    
  )
}

export default App
