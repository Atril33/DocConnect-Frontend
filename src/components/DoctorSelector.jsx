import React from 'react';
import PropTypes from 'prop-types';

const DoctorSelector = ({ doctors, selectedDoctorIndex, onChange }) => (
  <select
    value={selectedDoctorIndex !== null ? selectedDoctorIndex : ''}
    onChange={(e) => onChange(e.target.value !== '' ? parseInt(e.target.value, 10) : null)}
    className="w-[50%] p-2 border border-gray-300 rounded-md"
  >
    <option value="">Select a doctor</option>
    {doctors.map((doctor) => (
      <option key={doctor.id} value={doctor.id}>
        {doctor.name}
      </option>
    ))}
  </select>
);

DoctorSelector.propTypes = {
  doctors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  selectedDoctorIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DoctorSelector;
