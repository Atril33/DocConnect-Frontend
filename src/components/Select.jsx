import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  label, register, name, options, ...htmlAttributes
}) => (
  <div {...htmlAttributes}>
    <div className="relative h-10 min-w-[200px]">
      <select
        {...register(name)}
        className="peer h-full w-full rounded-[7px] border border-gray-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.text}</option>
        ))}
      </select>
      <label
        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
      >
        {label}
      </label>
    </div>
  </div>
);

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func,
  options: PropTypes.arrayOf(Object).isRequired,
};

Select.defaultProps = {
  register: () => ([]),
};

export default Select;
