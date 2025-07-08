import React, { useState } from 'react';
import axios from 'axios';
import './Shortener.css';

function Shortener() {
  const [url, setUrl] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [validity, setValidity] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { url };
      if (shortcode.trim()) body.shortcode = shortcode;
      if (validity.trim()) body.validity = parseInt(validity, 10);

      const res = await axios.post('http://localhost:3000/shorturls', body);
      setResponse(res.data);
    } catch (err) {
      alert(err?.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>🔗 URL Shortener</h2>
        <form onSubmit={handleSubmit}>
          <label>Long URL:</label>
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very-long-url"
          />

          <label>Custom Shortcode (optional):</label>
          <input
            type="text"
            value={shortcode}
            onChange={(e) => setShortcode(e.target.value)}
            placeholder="my-custom-code"
          />

          <label>Validity in minutes (optional):</label>
          <input
            type="number"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            placeholder="30"
          />

          <button type="submit">Create Short Link</button>
        </form>

        {response && (
          <div className="result">
            <p><strong>Short Link:</strong> <a href={response.shortLink} target="_blank">{response.shortLink}</a></p>
            <p><strong>Expires At:</strong> {new Date(response.expiry).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shortener;
