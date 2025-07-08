const express = require('express');
const cors = require('cors'); // ✅ Import this
const urlRoutes = require('./route/url.route');
const { loggingMiddleware } = require('./middleware/loggingMiddleware');

const app = express();

// ✅ Allow frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // or use "*" to allow all
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use(loggingMiddleware);
app.use('/shorturls', urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
