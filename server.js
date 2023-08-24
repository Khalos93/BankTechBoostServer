require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const bondsRoutes = require('./routes/bonds-route');
const PORT = process.env.PORT || 8080;
const DOMAIN = process.env.DOMAIN;

app.use(express.json());

app.use(cors());

app.get('/', bondsRoutes);

app.use((req, res, next) => {
  console.log(`we just got a request!`);
  next();
});

app.listen(PORT, () => {
  console.log(`running at ${DOMAIN}${PORT}`);
});
