import validator from 'validator';
import jwt from 'jsonwebtoken';

import MethodChunk from '../models/method-chunk';
import { isMethodChunkValid } from '../utils/method-chunk';
import logger from '../utils/logger';
import { errorCode } from '../constants';
import config from '../config';

exports.insert = async (req, res, next) => {
  try {
    const data = req.body || {};
    if (!isMethodChunkValid(data)) throw new Error(errorCode.InvalidMethodChunk);
    data.creator = req.user.username;
    await MethodChunk.create(data);
    res.json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

