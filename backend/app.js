require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { errorHandler } = require('./middlewares/errorHandler');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_DB, PORT } = require('./utils/config');
const { limiter } = require('./utils/constants');
const cors = require('cors');
const path = require('path');
const app = express();

mongoose.connect(MONGO_DB)
  .then(() => console.log('MongoDB connected to:', MONGO_DB)) // ← добавить
  .catch((err) => console.log(err));

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://relocate-omega.vercel.app'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});