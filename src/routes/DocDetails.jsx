import React from 'react';
import Sidebar from './Sidebar';

const DocDetails = () => (
  <>
    <div className="flex">
      <Sidebar />
      <div className="flex-1 h-screen py-32 px-8">
        AppointmentList
      </div>
    </div>
  </>
);

export default DocDetails;
