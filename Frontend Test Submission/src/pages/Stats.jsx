import React, { useState } from 'react';
import axios from 'axios';

function Stats() {
  const [inputValue, setInputValue] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStats(null);

    let code = inputValue.trim();

    // Extract shortcode if full URL is pasted
    if (code.includes('/')) {
      code = code.split('/').pop();
    }

    try {
      const res = await axios.get(`http://localhost:3000/shorturls/${code}`);
      setStats(res.data);
    } catch (err) {
      setError(err?.response?.data?.error || 'Invalid shortcode or expired.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-600 flex items-center justify-center gap-2">
          📊 Short URL Stats
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-gray-700 font-medium">Shortcode:</label>
          <input
            type="text"
            placeholder="Enter shortcode or full short URL"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
          >
            Get Stats
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-600 text-center font-medium">{error}</div>
        )}

        {stats && (
          <div className="mt-6 bg-gray-50 p-4 rounded-md border">
            <p><strong>🔗 Original URL:</strong> <a href={stats.originalUrl} className="text-blue-600 underline" target="_blank">{stats.originalUrl}</a></p>
            <p><strong>📅 Created At:</strong> {new Date(stats.createdAt).toLocaleString()}</p>
            <p><strong>⏰ Expires At:</strong> {new Date(stats.expiresAt).toLocaleString()}</p>
            <p><strong>👁️ Clicks:</strong> {stats.clicks}</p>

            {stats.clickDetails?.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Click Details:</h4>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {stats.clickDetails.map((click, index) => (
                    <li key={index}>
                      {new Date(click.timestamp).toLocaleString()} - {click.referrer || 'Unknown'} - {click.location || 'Unknown'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Stats;
