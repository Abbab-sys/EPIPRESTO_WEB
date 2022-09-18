import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login';
import Synchronisation from './pages/synchronisation/Synchronisation';
import SignUp from './pages/sign_up/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<SignUp />} path="/sign-up"></Route>
          <Route element={<Synchronisation />} path="/synchro"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
