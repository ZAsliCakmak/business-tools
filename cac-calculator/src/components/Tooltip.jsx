import React from 'react';

const Tooltip = ({ text }) => (
  <div className="tooltip relative inline-block cursor-help">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span className="tooltiptext absolute z-10 invisible opacity-0 w-[200px] bg-sky-600 text-white text-center rounded-md py-2 px-3 bottom-[125%] left-1/2 -translate-x-1/2 transition-opacity duration-300 text-sm leading-relaxed after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-[5px] after:border-[5px] after:border-t-[#4e54c8] after:border-transparent after:border-b-0">
      {text}
    </span>
  </div>
);

export default Tooltip;
