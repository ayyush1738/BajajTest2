import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // Set the document title to the roll number
  document.title = "YourRollNumber";  // Replace with actual roll number

  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState([]);

<<<<<<< HEAD
  const apiUrl = 'https://bajaj-test1.vercel.app/bfhl'; // Replace with your backend API URL
=======
  const apiUrl = 'https://bajaj-test1.vercel.app/bfhl'; // Add the deployed backend API URL
>>>>>>> fff8c71a17f618adefb62181a7a899bf02ed5ecd

  const handleSubmit = async () => {
    try {
      const jsonData = JSON.parse(input); // Ensure input is valid JSON
      const res = await axios.post(apiUrl, jsonData);
      setResponse(res.data);
      setError('');
    } catch (e) {
      setError('Invalid JSON format or API error');
      setResponse(null);
    }
  };

  const handleFilterChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setFilters(value);
  };

  const filteredResponse = () => {
    if (!response) return null;
    const result = {};
    if (filters.includes('Numbers')) result.numbers = response.numbers;
    if (filters.includes('Alphabets')) result.alphabets = response.alphabets;
    if (filters.includes('Highest lowercase alphabet'))
      result.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    return result;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-xl font-bold mb-4">JSON Validator and Response Renderer</h1>
      <div className="w-full max-w-lg bg-white shadow-md p-6 rounded-lg">
        {/* Input Section */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">API Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"data":["M","1","334","4","B"]}'
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
        <div className="flex justify-center mb-6">
          <button
            className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        {/* Error Handling */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Filter Section */}
        {response && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Multi Filter</label>
            <select
              multiple
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleFilterChange}
            >
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
          </div>
        )}

        {/* Filtered Response Section */}
        {response && (
          <div className="border-t pt-4">
            <h3 className="text-gray-700 font-semibold mb-2">Filtered Response</h3>
            <pre className="bg-gray-100 p-4 rounded-md">
              {JSON.stringify(filteredResponse(), null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
