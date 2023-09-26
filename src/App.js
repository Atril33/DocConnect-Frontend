import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Home from './routes/Home';
import AppointmentList from './routes/AppointmentList';
import DocDetails from './routes/DocDetails';
import AppointmentDetails from './routes/AppointmentDetails';
import SignUp from './routes/SignUp';
import Login from './routes/Login';
import ProtectedRoute from './components/ProtectedRoute';

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
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
