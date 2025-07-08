🔗 Project Overview – URL Shortener (Full Stack)
🛠️ Backend
Built with Node.js (Express) using a simple microservice architecture.

Handles two main routes:

POST /shorturls: Creates a short URL with optional custom shortcode and expiry.

GET /shorturls/:shortcode: Returns usage stats and metadata for a shortcode.

Features:

Validates user input for URL and shortcode format.

Generates unique shortcodes when not provided.

Defaults expiry time to 30 minutes if not specified.

Stores data (short URL, expiry, click logs) in-memory.

Tracks each click with timestamp and referrer.

Includes a custom-built Logging Middleware:

Sends logs to an external logging API.

Captures events like creation, errors, invalid requests, and stats lookups.

Reusable across backend or frontend.

🎨 Frontend
Built with React (Vite) and styled using Tailwind CSS.

Two main pages:

Shortener Page:

Form to enter the long URL.

Optional inputs for custom shortcode and expiry (in minutes).

Shows the resulting short link and expiry time.

Stats Page:

Input a shortcode to fetch and view stats.

Displays original URL, creation and expiry dates, total clicks, and click logs.

Responsive and clean UI for a smooth user experience.

Uses Axios for making API requests.

Includes error handling with user-friendly alerts.

Navigation via a minimal Navbar with links to both pages.
