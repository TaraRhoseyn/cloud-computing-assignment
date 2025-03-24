import React from 'react';

function ButtonPrimary({ onClick, children, type }) {
  return (
    <button
      onClick={onClick}
      className="my-5 bg-lime-400 hover:bg-lime-700 text-black font-bold py-2 px-4 rounded"
      type={type}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
