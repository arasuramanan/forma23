import './App.css';
import Header from './Components/Header/Header';
import DetailsList from './Components/DetailList/DetailList';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Signup from './Components/Signup';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header /> 
      <Routes>
        <Route path='/list' element={<DetailsList/>}/>  
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes> 
    </div>
    </BrowserRouter>
  );
}

export default App;