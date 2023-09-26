import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './routes/Home';
import AppointmentList from './routes/AppointmentList';
import DocDetails from './routes/DocDetails';
import AppointmentDetails from './routes/AppointmentDetails';
import CreateAppointment from './routes/CreateAppointment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="appointment-list" element={<AppointmentList />} />
        <Route path="docdetails" element={<DocDetails />} />
        <Route path="appointment" element={<AppointmentDetails />} />
        <Route path="create-appointment" element={<CreateAppointment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
