import Calculator from './components/Calculator'
import Rating from './components/Rating'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-md w-full">
        <Calculator />
        <Rating />
      </div>
    </div>
  )
}

export default App