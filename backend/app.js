require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { errorHandler } = require('./middlewares/errorHandler');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_URL, PORT } = require('./utils/config');
const { limiter } = require('./utils/constants');
const cors = require('cors');
const path = require('path');
const app = express();

mongoose.connect(MONGO_URL)
  .catch((err) => console.log(err));

app.use(cors({
  origin: ['https://relocate-omega.vercel.app'],
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(requestLogger);
app.set('trust proxy', 1);
app.use(limiter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {});