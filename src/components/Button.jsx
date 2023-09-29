import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  type,
  text,
  className,
  ...htmlAttributes
}) => (
  <button
    {...htmlAttributes}
    type={type === 'submit' ? 'submit' : 'button'}
    className={`bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${className}`}
  >
    {text}
  </button>
);

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

export default Button;
