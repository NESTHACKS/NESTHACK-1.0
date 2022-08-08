import React from 'react';

function Button(props: any) {
  const { title, onClick } = props;
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex outline-none items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500   hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
    >
      {title}
    </button>
  );
}

export default Button;
