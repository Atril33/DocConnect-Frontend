import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './routes/Home';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import AppointmentList from './routes/AppointmentList';
import ListDoc from './routes/ListDoc';
import DocDetails from './routes/DocDetails';
import AddDoc from './routes/AddDoc';
import DeleteDoc from './routes/DeleteDoc';
import AppointmentUpdate from './routes/AppointmentUpdate';
import CreateAppointment from './routes/CreateAppointment';
import Layout from './components/Layout';
import NotMatch from './routes/NotMatch';
import Logout from './routes/Logout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="sign_up" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="appointment-list" element={<AppointmentList />} />
              <Route path="list-docs" element={<ListDoc />} />
              <Route path="docdetails" element={<DocDetails />} />
              <Route path="appointment/:appId" element={<AppointmentUpdate />} />
              <Route path="create-appointment" element={<CreateAppointment />} />
              <Route path="add-docs" element={<AddDoc />} />
              <Route path="delete-docs" element={<DeleteDoc />} />
            </Route>
            <Route path="logout" element={<Logout />} />
          </Route>
          <Route path="*" element={<NotMatch />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
