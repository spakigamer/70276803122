const express = require('express');
const cors = require('cors');
const urlRoutes = require('./route/url.route');
const { loggingMiddleware } = require('./middleware/loggingMiddleware');
const { redirectShortUrl } = require('./controller/url.controller'); // ✅ Import this

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use('/shorturls', urlRoutes);
app.get('/:shortcode', redirectShortUrl); // ✅ This handles redirection

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
