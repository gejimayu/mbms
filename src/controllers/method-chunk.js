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
    const possibleDuplicate = await MethodChunk.findOne({ ['nameId']: data['nameId'] });
    if (possibleDuplicate) throw new Error(errorCode.MethodChunkAlreadyExists);
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

exports.getAll = async (req, res, next) => {
  try {
    const methodChunk = await MethodChunk.find();
    const methodChunkHeader = [];
    methodChunk.forEach((m) => {
      methodChunkHeader.push({
        'nameId': m['nameId'],
        'name': m['name'],
        'description': m['description'],
      });
    });
    res.json({
      status: 'success',
      data: methodChunkHeader,
    });
  } catch (err) {
    next(err);
  }
};
