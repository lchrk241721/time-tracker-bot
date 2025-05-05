require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const botRoutes = require('./routes/bot');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/bot', botRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Time Tracker Bot running on port ${PORT}`);
});