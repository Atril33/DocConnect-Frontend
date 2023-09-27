import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './routes/Home';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import AppointmentList from './routes/AppointmentList';
import DocDetails from './routes/DocDetails';
import AppointmentDetails from './routes/AppointmentDetails';
import CreateAppointment from './routes/CreateAppointment';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="sign_up" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="appointment-list" element={<AppointmentList />} />
            <Route path="docdetails" element={<DocDetails />} />
            <Route path="appointment" element={<AppointmentDetails />} />
            <Route path="create-appointment" element={<CreateAppointment />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
