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

exports.getOne = async (req, res, next) => {
  try {
    const { name_id } = req.params;
    const methodChunk = await MethodChunk.findOne({ nameId: name_id });
    if (!methodChunk) throw new Error(errorCode.MethodChunkNotFound);
    res.json({
      status: 'success',
      data: methodChunk,
    });
  } catch (err) {
    next(err);
  }
};
