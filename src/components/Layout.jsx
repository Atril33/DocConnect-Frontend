import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => (
  <div className="flex">
    <Sidebar />
    <Outlet />
  </div>
);

export default Layout;
