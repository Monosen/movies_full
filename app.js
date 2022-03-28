const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { usersRouter } = require('./routes/user.routes');
const { actorsRouter } = require('./routes/actor.routes');
const { moviesRouter } = require('./routes/movie.routes');
const { ReviewsRouter } = require('./routes/review.routes');

const { globalErrorHandler } = require('./controllers/error.controller');

const { AppError } = require('./util/appError');

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/actors', actorsRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/reviews', ReviewsRouter);

app.use('*', (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

app.use(globalErrorHandler);

module.exports = { app };
