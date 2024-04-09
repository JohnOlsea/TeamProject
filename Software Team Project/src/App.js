import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import React, { useState } from 'react';

// User Pages
import Home from './pages/Home'
import PersonalInfo from './pages/PersonalInfo'
import Login from './pages/Login'
import DegreeCertificateCollection from './pages/DegreeCertificateCollection'
import AddressConfirmation from './pages/AddressConfirmation'
import Payment from './pages/Payment'
import PaymentCompleted from './pages/PaymentCompleted'
import GraduationDayPickup from './pages/GraduationDayPickUp'
import PickUpatRegistrationOffice from './pages/PickUpAtRegistrationOffice'

// Test
import ImageTest from './pages/ImageTest'

// Admin Pages
import AdminHome from './pages/adminPages/adminHome'
import AdminPrint from './pages/adminPages/adminPrint'
import AdminShowUpdatedStatus from './pages/adminPages/adminShowUpdatedStatus';
import AdminUpdateStatus from './pages/adminPages/adminUpdateStatus';
import AdminLogin from './pages/adminPages/adminLogin';


function App() {

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='login' element={<Login />} />
          <Route path='home' element={<Home />} />
          <Route path='personalInfo' element={<PersonalInfo />} />
          <Route path='degreeCertificateCollection' element={<DegreeCertificateCollection />} />
          <Route path='addressConfirmation' element={<AddressConfirmation />} />
          <Route path='payment' element={<Payment />} />
          <Route path='paymentCompleted' element={<PaymentCompleted />} />
          <Route path='graduationDayPickup' element={<GraduationDayPickup />} />
          <Route path='pickUpatRegistrationOffice' element={<PickUpatRegistrationOffice />} />

          <Route path='adminLogin' element={<AdminLogin />} />
          <Route path='adminHome' element={<AdminHome />} />
          <Route path='adminPrint' element={<AdminPrint />} />
          <Route path='adminShowUpdatedStatus' element={<AdminShowUpdatedStatus />} />
          <Route path='adminUpdateStatus' element={<AdminUpdateStatus />} />

          <Route path='imageTest' element={<ImageTest />} />


        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;