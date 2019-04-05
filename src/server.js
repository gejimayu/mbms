import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import winston from 'winston';
import compression from 'compression';
import expressWinston from 'express-winston';
import jwt from 'express-jwt';

import config from './config';
import logger from './utils/logger';
import { errorCode } from './constants';

const api = express();

api.use(cors());
api.use(compression());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

api.use(
	jwt({ secret: config.jwt.secret }).unless({
		path: [
			'/',
			'/register',
			'/login',
		]
	})
);

api.use(
	expressWinston.logger({
		transports: [new winston.transports.Console()],
		format: winston.format.combine(
			winston.format.timestamp(),
		  winston.format.colorize(),
		  winston.format.simple()
		),
	})
);

api.listen(config.server.port, err => {
	if (err) {
		logger.error(err);
		process.exit(1);
	}

	require('./utils/db');

	fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
		require('./routes/' + file)(api);
	});

	api.route('/').get((req, res) => res.send('Welcome to Method Base Management System'))

	api.use((err, req, res, next) => {
		if (err.name === errorCode.UnauthorizedError) {
			res.status(401).send({
				status: 'error',
				message: errorCode.UnauthorizedError,
			});
		} else if (err.name === errorCode.UsernameNotAlphanumeric) {
			res.status(422).send({
				status: 'error',
				message: errorCode.UsernameNotAlphanumeric,
			});
		} else if (err.name === errorCode.MustHaveUsernamePassword) {
			res.status(400).send({
				status: 'error',
				message: errorCode.MustHaveUsernamePassword,
			});
		} else if (err.name === errorCode.WrongUsernamePassword) {
			res.status(400).send({
				status: 'error',
				message: errorCode.WrongUsernamePassword,
			});
		} else if (err.name === errorCode.AlreadyRegistered) {
			res.status(422).send({
				status: 'error',
				message: errorCode.AlreadyRegistered,
			});
		}
		console.error(err.stack)
	  res.status(500).send({
	  	status: 'error',
	  	message: err.message || 'Something broke!',
	  })
	});

	logger.info(
		`API is now running on port ${config.server.port} in ${config.env} mode`
	);
});

module.exports = api;
