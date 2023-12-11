import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./AppLayout.css"
import SideBar from '../components/DashBoard/SideBar/SideBar';

import ExpenceMangement from '../Pages/ExpenceMangement';
import Header from './header';
import Home from '../Pages/Home';
// import ForgetPassword from '../components/ForgetPassword'
function AppLayout() {

  return (
    <div className='w-screen'>
      <div className='layout md:flex flex-col'>
     <SideBar />
     <Header />
      <div className='app-body'>
      
      
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/expence-management" element={<ExpenceMangement />} />
        {/* <Route path="/forget-password" element={<ForgetPassword />} /> */}
      </Routes>
      </div>
    </div>
    </div>
  );
}

export default AppLayout;
