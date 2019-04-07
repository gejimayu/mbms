import validator from 'validator';
import jwt from 'jsonwebtoken';

import config from '../config';
import User from '../models/user';
import logger from '../utils/logger';
import { errorCode } from '../constants';

exports.login = async (req, res, next) => {
  try {
    const data = req.body || {};

    if (!data.username || !data.password) {
      throw new Error(errorCode.MustHaveUsernamePassword);
    }

    const user = await User.findOne({ username: data.username });
    if (!user) {
      throw new Error(errorCode.WrongUsernamePassword);
    }

    const valid = await user.verifyPassword(data.password);

    if (valid) {
      const token = jwt.sign(
        { username: data.username },
        config.jwt.secret,
        { expiresIn: '7d' },
      );
      res.json({
        status: 'success',
        data: { token },
      });
    } else {
      throw new Error(errorCode.WrongUsernamePassword);
    }
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const data = req.body || {};

    if (!data.username || !data.password) {
      throw new Error(errorCode.MustHaveUsernamePassword);
    }

    if (data.password && !validator.isAlphanumeric(data.username)) {
      throw new Error(errorCode.UsernameNotAlphanumeric);
    }

    const user = await User.findOne({ username: data.username });
    if (user) {
      throw new Error(errorCode.AlreadyRegistered);
    }

    User.create(data)
      .then(user => {
        const token = jwt.sign(
          { username: data.username },
          config.jwt.secret,
          { expiresIn: '7d' },
        );
        res.json({
          status: 'success',
          data: { token },
        });
      })
      .catch(err => {
        logger.error(err);
        throw err;
      });
  } catch (err) {
    next(err);
  }
};
