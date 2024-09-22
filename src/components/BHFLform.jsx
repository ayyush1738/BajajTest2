import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const BFHLForm = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        document.title = "AP21110010239";
    }, []);

    const options = [
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'numbers', label: 'Numbers' },
        { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResponse(null);

        try {
            const parsedJson = JSON.parse(jsonInput);
             const { data } = await axios.post('https://bajaj-finserv-backend-gules.vercel.app/bfhl', parsedJson);
            setResponse(data);
        } catch (err) {
            if (err instanceof SyntaxError) {
                setError('Invalid JSON input');
            } else if (err.response) {
                setError(`API error: ${err.response.data.error || 'Unknown error'}`);
            } else if (err.request) {
                setError('No response received from the server');
            } else {
                setError('Request setup error');
            }
            console.error('Full error:', err);
        }
    };

    const filterResponse = (response) => {
        if (!response) return null;
        if (selectedOptions.length === 0) return response;
        const filtered = {};
        selectedOptions.forEach(option => {
            if (response[option.value]) {
                filtered[option.value] = response[option.value];
            }
        });
        return filtered;
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jsonInput">
                            JSON Input
                        </label>
                        <textarea
                            id="jsonInput"
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows="4"
                            placeholder='{"data": ["A","1","B","2","C","3"]}'
                        ></textarea>
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

                {response && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Filter Response (Optional)
                        </label>
                        <Select
                            isMulti
                            name="filters"
                            options={options}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={setSelectedOptions}
                        />
                    </div>
                )}

                {response && (
                    <div className="bg-gray-100 p-4 rounded">
                        <h3 className="text-lg font-bold mb-2">Full Response:</h3>
                        <pre className="text-sm overflow-auto max-h-96">
                            {JSON.stringify(response, null, 2)}
                        </pre>
                        
                        {selectedOptions.length > 0 && (
                            <>
                                <h3 className="text-lg font-bold mt-4 mb-2">Filtered Response:</h3>
                                <pre className="text-sm overflow-auto max-h-96">
                                    {JSON.stringify(filterResponse(response), null, 2)}
                                </pre>
                            </>
                        )}
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BFHLForm;