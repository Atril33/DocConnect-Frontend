import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Home from './routes/Home';
import AppointmentList from './routes/AppointmentList';
import { doctorsFetchData } from './redux/doctors/doctorSlice';
import DoctorDetails from './routes/DoctorDetails';
import AppointmentDetails from './routes/AppointmentDetails';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Doctors from './routes/Doctors';

function App() {
  const doctorsDispatch = useDispatch();

  useEffect(() => {
    doctorsDispatch(doctorsFetchData());
  }, [doctorsDispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="sign_up" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="doctors" element={<Doctors />} />
            <Route path="appointment-list" element={<AppointmentList />} />
            <Route path="/doctor/:id" element={<DoctorDetails />} />
            <Route path="appointment" element={<AppointmentDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
