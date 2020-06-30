const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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
const authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/api/prizes', prizesRouter);
app.use('/api/candidates', candidatesRouter);
app.use('/api/winners', winnersRouter);
app.use('/api/replays', replaysRouter);
app.use('/api/notice', noticeRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server is listening on port 3000");
});

const options = {
	definition: {
		info: {
			title: '백상예술대상 API',
			version: '1.0.0',
			description: '백상예술대상 클론코딩을 위한 API 문서입니다. API 문서 제작에는 [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express), [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) NPM 모듈을 사용했습니다.',
			contact: {
				email: 'haneulcho@nexon.co.kr'
			}
		},
		basePath: '/api',
		securityDefinitions: {
			JWT: {
				description: `http://baeksang-api.herokuapp.com/api/auth/swagger 에서 발급한 토큰값을 Value에 붙여 넣으세요.`,
				type: 'apiKey',
				name: 'x-access-token',
				in: 'header'
			}
		}
	},
	apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
