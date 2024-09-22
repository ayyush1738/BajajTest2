import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Ensure you create an App.css for styling

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState([]);

  const apiUrl = 'https://bajaj-finserv-7t1l.vercel.app/bfhl'; // Add the deployed backend API URL

  const handleSubmit = async () => {
    try {
      const jsonData = JSON.parse(input); // Ensure input is valid JSON
      const res = await axios.post(apiUrl, jsonData);
      setResponse(res.data);
      setError('');
    } catch (e) {
      setError('Invalid JSON format or API error');
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
    <div className="App">
      <h1>BFHL Challenge</h1>
      <div className="input-section">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"data":["M","1","334","4","B"]}'
          className="input-area"
        />
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {error && <p className="error">{error}</p>}

      {response && (
        <div className="filter-section">
          <label>Multi Filter</label>
          <select multiple className="filter-select" onChange={handleFilterChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
        </div>
      )}

      <div className="response-section">
        {response && (
          <>
            <h3>Filtered Response</h3>
            <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
