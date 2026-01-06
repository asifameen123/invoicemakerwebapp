import React from 'react';

export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label>{label}</label>}
      <input {...props} />
    </div>
  );
}
