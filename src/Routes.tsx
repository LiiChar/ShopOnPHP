
import React from 'react';
import { Routes as Rts, Route } from 'react-router-dom'
import { Products } from './pages/productsPage/Products';
import { Registration } from './pages/registrationPage/Registration';
import { Login } from './pages/loginPage/Login';
import { Admin } from './pages/adminPage/Admin';
import { User } from './pages/userPage/User';
import { Product } from './pages/productPage/Product';
import { Busket } from './pages/busketPage/Busket';

function Routes() {
  return (
    <Rts>
      <Route path='/' element={<Products />} />
      <Route path='/register' element={<Registration />} />
      <Route path='/login' element={<Login />} />
      <Route path='/product/:id' element={<Product />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/user/:id' element={<User />} />
      <Route path='/busket/:id' element={<Busket />} />
    </Rts>
  )

}

export default Routes;
