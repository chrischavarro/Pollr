import React from 'react';

export default ({ input, label}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
    </div>
  );
};
