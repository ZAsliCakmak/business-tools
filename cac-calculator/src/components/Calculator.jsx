import React, { useState } from 'react';
import Tooltip from './Tooltip';

const Calculator = () => {
  const [rawValues, setRawValues] = useState({
    marketing: '',
    sales: '',
    customers: ''
  });
  const [displayValues, setDisplayValues] = useState({
    marketing: '',
    sales: '',
    customers: ''
  });
  const [result, setResult] = useState(null);

  
  const formatNumber = (value) => {
    if (value === '') return '';
    
    
    if (value.endsWith('.')) return value;
    
    const parts = value.split('.');
    const integerPart = parts[0].replace(/\D/g, '');
    const decimalPart = parts[1] ? `.${parts[1]}` : '';
    
    
    const formattedInteger = integerPart.length > 0 
      ? parseInt(integerPart, 10).toLocaleString('en-US') 
      : '';
    
    return formattedInteger + decimalPart;
  };

  
  const handleInputChange = (field, value) => {
    
    const parts = value.split('.');
    if (parts.length > 1 && parts[1].length > 2) {
      return;
    }
    
    
    const cleanedValue = value.replace(/[^0-9.]/g, '')
                            .replace(/(\..*)\./g, '$1');
    
    setRawValues(prev => ({ ...prev, [field]: cleanedValue }));
    
    
    setDisplayValues(prev => ({ ...prev, [field]: formatNumber(cleanedValue) }));
  };

  const calculate = () => {
    
    if (rawValues.marketing === '' || rawValues.sales === '' || rawValues.customers === '') {
      return setResult({ message: 'Please enter valid numbers for all fields', type: 'error' });
    }

    const m = parseFloat(rawValues.marketing.replace(/,/g, '')) || 0;
    const s = parseFloat(rawValues.sales.replace(/,/g, '')) || 0;
    const c = parseFloat(rawValues.customers.replace(/,/g, '')) || 0;

    if (isNaN(m) || isNaN(s) || isNaN(c)) {
      return setResult({ message: 'Please enter valid numbers for all fields', type: 'error' });
    }
    if (m < 0 || s < 0) {
      return setResult({ message: 'Costs cannot be negative', type: 'error' });
    }
    if (c <= 0) {
      return setResult({ message: 'New customers must be greater than zero', type: 'error' });
    }

    const cac = (m + s) / c;
    let type = 'good';
    let suggestion = '✔ Excellent CAC! Your acquisition costs are very efficient';

    if (cac >= 50) {
      type = 'bad';
      suggestion = '❌ High CAC! Consider optimizing your acquisition channels';
    } else if (cac >= 20) {
      type = 'moderate';
      suggestion = '⚠ Moderate CAC. Room for improvement in cost efficiency';
    }

    setResult({ 
      cac: cac.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 
      suggestion, 
      type 
    });
  };

  const reset = () => {
    setRawValues({ marketing: '', sales: '', customers: '' });
    setDisplayValues({ marketing: '', sales: '', customers: '' });
    setResult(null);
  };

  return (
    <div className="p-8 border-b border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-sky-600 text-center">Customer Acquisition Cost (CAC) Calculator</h1>

      <div className="space-y-4">
        {[
          { label: 'Marketing Costs', id: 'marketing', field: 'marketing', tip: 'Total spent on marketing campaigns, ads, and promotions' },
          { label: 'Sales Costs', id: 'sales', field: 'sales', tip: 'Total spent on sales team salaries, tools, and commissions' },
          { label: 'New Customers', id: 'customers', field: 'customers', tip: 'Number of new customers acquired' },
        ].map(({ label, id, field, tip }, i) => (
          <div key={i}>
            <div className="flex items-center gap-2 mb-1">
              <label className="text-sm font-medium text-gray-700">{label}:</label>
              <Tooltip text={tip} />
            </div>
            <input
              type="text"
              id={id}
              value={displayValues[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#4e54c8] focus:border-[#4e54c8]"
              placeholder={`Enter ${label.toLowerCase()}`}
              inputMode="decimal"
            />
          </div>
        ))}

        <div className="flex gap-4">
          <button onClick={calculate} className="flex-1 bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-500 ease-in duration-150">Calculate CAC</button>
          <button onClick={reset} className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400">Reset</button>
        </div>

        <div className="text-center font-medium text-black mt-4 space-y-2">
          {result ? (
            result.type === 'error' ? (
              <p className="text-red-500">{result.message}</p>
            ) : (
              <div className="space-y-4">
                <p className="text-lg font-bold">
                  CAC: <span className={result.type === 'bad' ? 'text-red-600' : result.type === 'moderate' ? 'text-yellow-600' : 'text-green-600'}>
                    {result.cac}
                  </span> USD per customer
                </p>
                <p className={`${result.type === 'bad' ? 'text-red-600' : result.type === 'moderate' ? 'text-yellow-600' : 'text-green-600'} text-sm`}>
                  {result.suggestion}
                </p>
              </div>
            )
          ) : (
            <p>Please enter values and click calculate.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;