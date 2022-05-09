import React from 'react'
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import TodoDashboard from "./components/TodoDashboard"
import { Routes, Route } from 'react-router-dom';

const App = () => {
  

  return (
    <>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} >
          <Route path="" element={<TodoDashboard />}/>
        </Route>
        <Route exact path="/" element={<TodoDashboard />}/>

      </Routes>
    </>
  );
}

export default App;
