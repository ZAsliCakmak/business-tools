import { useState, useEffect } from 'react';

function Rating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleRating = (star) => {
    setRating(star);
    setShowFeedback(true);
  };

  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => {
        // Yeni pencere açmak yerine mevcut sekmede yönlendirme yapıyoruz
        window.location.href = 'https://www.trustpilot.com/evaluate/startxpress.io';
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  return (
    <div className="bg-gray-50 p-8">
      <div className="relative overflow-hidden rounded-xl text-center h-[264px]">
        {!showFeedback ? (
          <div className="transition-all duration-300 h-full flex flex-col items-center justify-center">
            <div className="mb-6">
              <h3 className="text-gray-800 text-lg font-semibold mb-2">
                How would you rate this calculator?
              </h3>
              <p className="text-gray-500 text-sm">Your feedback helps us improve</p>
            </div>
            <div className="flex justify-center gap-2 mb-4" role="radiogroup">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-3xl cursor-pointer transition-all duration-200 ${
                    (hover || rating) >= star ? 'text-yellow-500' : 'text-gray-300'
                  } hover:scale-125 focus:outline-none`}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => handleRating(star)}
                  aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-xl p-8">
            <div className="animate-bounce mb-3">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-800 font-medium">Thank you for your feedback!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rating;