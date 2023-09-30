import React from 'react';
import PropTypes from 'prop-types';

const DoctorSelector = ({ doctors, selectedDoctorIndex, onChange }) => (
  <div className="flex flex-col items-center gap-4 md:flex-row">
    <label htmlFor="doc-select"> Choose your doctor:</label>
    <select
      value={selectedDoctorIndex !== null ? selectedDoctorIndex : ''}
      onChange={(e) => onChange(e.target.value !== '' ? parseInt(e.target.value, 10) : null)}
      className="p-2 border border-gray-300 rounded-md"
      id="doc-select"
    >
      <option value="">Select a doctor</option>
      {doctors.map((doctor) => (
        <option key={doctor.id} value={doctor.id}>
          {doctor.name}
          ,
          {doctor.specialization.name}
        </option>
      ))}
    </select>
  </div>
);

DoctorSelector.propTypes = {
  doctors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  selectedDoctorIndex: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

DoctorSelector.defaultProps = {
  selectedDoctorIndex: null,
};

export default DoctorSelector;
