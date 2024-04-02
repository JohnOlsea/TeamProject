import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import React, { useState } from 'react';

// Pages
import Home from './pages/Home'
import PersonalInfo from './pages/PersonalInfo'
import Login from './pages/Login'
import DegreeCertificateCollection from './pages/DegreeCertificateCollection'
import AddressConfirmation from './pages/AddressConfirmation'
import Payment from './pages/Payment'
import PaymentCompleted from './pages/PaymentCompleted'
import GraduationDayPickup from './pages/GraduationDayPickUp'
import PickUpatRegistrationOffice from './pages/PickUpAtRegistrationOffice'


function App() {

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='home' element={<Home />} />
          <Route path='personalInfo' element={<PersonalInfo />} />
          <Route path='degreeCertificateCollection' element={<DegreeCertificateCollection />} />
          <Route path='addressConfirmation' element={<AddressConfirmation />} />
          <Route path='payment' element={<Payment />} />
          <Route path='paymentCompleted' element={<PaymentCompleted />} />
          <Route path='graduationDayPickup' element={<GraduationDayPickup />} />
          <Route path='pickUpatRegistrationOffice' element={<PickUpatRegistrationOffice />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;