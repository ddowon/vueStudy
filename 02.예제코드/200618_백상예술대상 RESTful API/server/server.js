const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
	next();
});

require('./lib/connection');

const indexRouter = require('./routes/index');
const prizesRouter = require('./routes/prizes');
const candidatesRouter = require('./routes/candidates');
const winnersRouter = require('./routes/winners');
const replaysRouter = require('./routes/replays');
const noticeRouter = require('./routes/notice');
const userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/api/prizes', prizesRouter);
app.use('/api/candidates', candidatesRouter);
app.use('/api/winners', winnersRouter);
app.use('/api/replays', replaysRouter);
app.use('/api/notice', noticeRouter);
app.use('/api/user', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server is listening on port 3000");
});
