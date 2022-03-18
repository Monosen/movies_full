const express = require('express');
const cors = require('cors');

const { usersRouter } = require('./routes/user.routes');
const { actorsRouter } = require('./routes/actor.routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/actors', actorsRouter);

module.exports = { app };
