const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');

//connect to the database
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Move app.listen outside of the db.once callback
app.listen(PORT, () => {
    console.log(`🌍 Now listening on http://localhost:${PORT}`);
    });

db.once('open', () => {
  console.log('Connected to MongoDB!');
});
