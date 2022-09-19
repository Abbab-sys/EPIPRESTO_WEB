import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login';
import Synchronisation from './pages/synchronisation/Synchronisation';
import SignUp from './pages/sign_up/SignUp';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(135deg, rgb(255, 88, 88), rgb(240, 152, 25))",
    minHeight: '100vh',
  },
})

function App() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Router>
        <Routes>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<SignUp />} path="/sign-up"></Route>
          <Route element={<Synchronisation />} path="/synchronisation"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
