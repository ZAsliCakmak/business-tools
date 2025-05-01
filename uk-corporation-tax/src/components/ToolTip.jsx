function Tooltip({ text }) {
  return (
    <div className="relative ">
      <div className="peer">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#4e54c8] text-white text-[14px] rounded px-3 py-2 opacity-0 peer-hover:opacity-100 transition text-center pointer-events-none">
        {text}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#4e54c8]"></span>
      </span>
    </div>
  )
}
  
  export default Tooltip