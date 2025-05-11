import React, { useState } from 'react';

const Rating = () => {
  const [rated, setRated] = useState(false);
  const [hovered, setHovered] = useState(0);

  const handleClick = (value) => {
    if (!rated) {
      setRated(true);
      setTimeout(() => window.open('https://www.trustpilot.com/evaluate/startxpress.io', '_blank'), 1200);
    }
  };

  return (
    <div className="bg-gray-50 p-8">
      <div className="relative overflow-hidden rounded-xl text-center">
        <div className={`transition-all duration-300 ${rated ? 'opacity-0 -translate-y-5' : 'opacity-100'}`}>
          <div className="mb-6">
            <h3 className="text-gray-800 text-lg font-semibold mb-2">How would you rate this calculator?</h3>
            <p className="text-gray-500 text-sm">Your feedback helps us improve</p>
          </div>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                className={`text-3xl p-1 rounded-full transition-all duration-200 focus:outline-none ${
                  rated || hovered >= i ? 'text-yellow-500 scale-125' : 'text-gray-300'
                } focus-visible:ring-2 focus-visible:ring-yellow-500 active:ring-2 active:ring-yellow-500`}
                onMouseEnter={() => !rated && setHovered(i)}
                onMouseLeave={() => !rated && setHovered(0)}
                onClick={() => handleClick(i)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-white rounded-xl transition-all duration-300 ${rated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
          <div className= "bg-green-600 rounded-full flex items-center justify-center w-9 h-9 animate-[gentleBounce_1s_ease-in-out_infinite]">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={4} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <p className="text-gray-800 font-medium mt-3">Thank you for your feedback!</p>
        </div>
      </div>
    </div>
  );
};

export default Rating;