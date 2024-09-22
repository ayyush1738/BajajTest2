import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './App.css'; // Add any custom styling in this file

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState([]);

  const apiUrl = 'https://bajaj-test1.vercel.app/bfhl';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsonData = JSON.parse(input);
      const res = await axios.post(apiUrl, jsonData);
      setResponse(res.data);
      setError('');
    } catch (e) {
      setError('Invalid JSON format or API error');
    }
  };

  const filterOptions = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' },
  ];

  const handleFilterChange = (selected) => {
    setFilters(selected);
  };

  const filteredResponse = () => {
    if (!response) return null;
    const result = {};
    filters.forEach((filter) => {
      if (filter.value === 'Numbers') result.numbers = response.numbers;
      if (filter.value === 'Alphabets') result.alphabets = response.alphabets;
      if (filter.value === 'Highest lowercase alphabet')
        result.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    });
    return result;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">BFHL Challenge</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              JSON Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"data":["M","1","334","4","B"]}'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {response && (
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Filter Response (Optional)
            </label>
            <Select
              isMulti
              name="filters"
              options={filterOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleFilterChange}
            />
          </div>
        )}

        {response && (
          <div className="bg-gray-100 p-4 mt-4 rounded">
            <h3 className="text-lg font-bold mb-2">Filtered Response</h3>
            <pre className="text-sm overflow-auto max-h-96">
              {JSON.stringify(filteredResponse(), null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
