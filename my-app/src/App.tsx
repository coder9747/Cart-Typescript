import React from 'react';
import { useSelector, UseSelector } from 'react-redux/es/hooks/useSelector';
import { Routes,Route } from 'react-router-dom';
import Login from './Components/auth/Login';
import Register from './Components/auth/register';
import Home from './Components/Home';
import Cart from './Components/Cart';

const App = () => {
  const state = useSelector(state=>state);
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/cart' element={<Cart/>} />
   </Routes>
  )
}

export default App
