require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const prizesRouter = require('./routes/prizes');
const candidatesRouter = require('./routes/candidates');
const winnersRouter = require('./routes/winners');
const boardRouter = require('./routes/board');

app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

require('./lib/connection');

app.use('/', indexRouter);
app.use('/api/prizes', prizesRouter);
app.use('/api/candidates', candidatesRouter);
app.use('/api/winners', winnersRouter);
app.use('/api/board/notice', boardRouter);

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server is listening on port 3000");
});
