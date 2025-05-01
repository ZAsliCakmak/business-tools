import { useState } from 'react'
import Tooltip from './ToolTip'

function Calculator() {
  const [form, setForm] = useState({ revenue: '', expenses: '', capital: '', rdTaxCredits: '' })
  const [result, setResult] = useState('Enter values to calculate tax')

  const formatNumber = (value, isBlur = false) => {
    if (!value) return ''
    const number = parseFloat(value.replace(/[^0-9.]/g, ''))
    if (isNaN(number)) return ''
    
    const hasDecimal = value.includes('.')
    const decimalDigits = hasDecimal ? value.split('.')[1]?.length || 0 : 0
    
    return number.toLocaleString('en-GB', {
      minimumFractionDigits: isBlur ? 2 : (hasDecimal ? Math.min(decimalDigits, 2) : 0),
      maximumFractionDigits: 2
    })
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setForm({ ...form, [id]: formatNumber(value) })
  }

  const handleBlur = (e) => {
    const { id, value } = e.target
    if (value) {
      setForm({ ...form, [id]: formatNumber(value, true) })
    }
  }

  const resetForm = () => {
    setForm({ revenue: '', expenses: '', capital: '', rdTaxCredits: '' })
    setResult('Enter values to calculate tax')
  }

  const parseFormattedNumber = (str) => {
    return parseFloat(str.replace(/,/g, '')) || 0
  }

  const calculateTax = () => {
    const revenue = parseFormattedNumber(form.revenue)
    const expenses = parseFormattedNumber(form.expenses)
    const capital = parseFormattedNumber(form.capital)
    const rdTaxCredits = parseFormattedNumber(form.rdTaxCredits)

    const taxableProfit = revenue - expenses - capital - rdTaxCredits
    if (taxableProfit < 0) {
      setResult(<div className="text-red-600 font-medium">Invalid input: Profit cannot be negative</div>)
      return
    }

    const lowerLimit = 50000
    const upperLimit = 250000
    let tax = 0

    if (taxableProfit <= lowerLimit) {
      tax = taxableProfit * 0.19
    } else if (taxableProfit > upperLimit) {
      tax = taxableProfit * 0.25
    } else {
      const marginalRelief = ((upperLimit - taxableProfit) / (upperLimit - lowerLimit)) * (0.25 - 0.19) * lowerLimit
      tax = (taxableProfit * 0.25) - marginalRelief
    }

    setResult(
      <>
        <div className="text-sky-600 font-bold text-lg">
          Tax Owed: £{tax.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Taxable Profit: £{taxableProfit.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </>
    )
  }

  const inputStyle = 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4e54c8] focus:border-[#4e54c8] transition-all text-left'

  return (
    <div className="p-8 border-b border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-sky-600 text-center">UK Corporation Tax Calculator</h1>

      <div className="space-y-4">
        {[
          { 
            id: 'revenue', 
            label: 'Annual Revenue (£)', 
            tooltip: 'Total company income before deductions',
            placeholder: 'e.g., 100,000.00'
          },
          { 
            id: 'expenses', 
            label: 'Allowable Expenses (£)', 
            tooltip: 'Day-to-day running costs',
            placeholder: 'e.g., 30,000.00'
          },
          { 
            id: 'capital', 
            label: 'Capital Allowances (£)', 
            tooltip: 'Deductions for capital assets',
            placeholder: 'e.g., 5,000'
          },
          { 
            id: 'rdTaxCredits', 
            label: 'R&D Tax Credits (£)', 
            tooltip: 'Tax relief for R&D expenditure',
            placeholder: 'e.g., 2,000'
          },
        ].map(({ id, label, tooltip, placeholder }) => (
          <div key={id}>
            <div className="flex items-center gap-2 mb-1">
              <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
              <Tooltip text={tooltip} />
            </div>
            <input
              type="text" 
              id={id}
              value={form[id]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputStyle}
              placeholder={placeholder}
              inputMode="decimal"
            />
          </div>
        ))}

        <div className="flex gap-4">
          <button onClick={calculateTax} className="flex-1 bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-500 transition-colors duration-150 ease-in">
            Calculate Tax
          </button>
          <button onClick={resetForm} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
            Reset
          </button>
        </div>

        <div id="result" className="text-center font-medium text-gray-700 mt-4">{result}</div>

        <div className="bg-red-50 p-3 rounded-lg text-red-600 text-sm">
          <i className="fas fa-exclamation-circle mr-2"></i>
          <strong>Disclaimer:</strong> This calculator provides estimates only. Consult a qualified accountant for professional advice.
        </div>
      </div>
    </div>
  )
}

export default Calculator