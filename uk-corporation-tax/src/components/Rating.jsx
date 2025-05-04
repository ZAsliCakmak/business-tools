import { useState } from 'react';

function Rating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleRating = (star) => {
    setRating(star);
    setShowFeedback(true);

   
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isOnlySafariOnIOS = isIOS && isSafari;

    
    const redirect = () => {
      window.open('https://www.trustpilot.com/evaluate/startxpress.io', '_blank');
    };

    if (isOnlySafariOnIOS) {
      redirect(); 
    } else if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      setTimeout(redirect, 1200); 
    } else {
      setTimeout(redirect, 1200); 
    }
  };

  return (
    <div className="bg-gray-50 p-8">
      <div className="relative overflow-hidden rounded-xl text-center h-[150px]">
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
                  className={`text-3xl cursor-pointer transition-all duration-200 rounded-full p-1 ${
                    (hover || rating) >= star ? 'text-yellow-500' : 'text-gray-300'
                  } hover:scale-125 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 active:ring-2 active:ring-yellow-400`}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onTouchStart={() => setHover(star)}
                  onTouchEnd={() => setHover(0)}
                  onClick={() => handleRating(star)}
                  aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-xl animate-slide-up">
            <div className="animate-float mb-3">
              <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center">
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
            </div>
            <p className="text-gray-800 font-medium">Thank you for your feedback!</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slide-up {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
        .animate-float {
          animation: float 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Rating;