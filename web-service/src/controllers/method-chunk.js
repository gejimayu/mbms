import fetch from 'node-fetch';

import MethodChunk from '../models/method-chunk';
import { isMethodChunkValid } from '../utils/method-chunk';
import { errorCode } from '../constants';
import Config from '../config';

exports.insert = async (req, res, next) => {
  try {
    let data = req.body || {};
    const errorMsgMethodInvalid = isMethodChunkValid(data);
    if (errorMsgMethodInvalid) {
      throw new Error(errorMsgMethodInvalid);
    }
    const possibleDuplicate = await MethodChunk.findOne({ ['nameId']: data['nameId'] });
    if (possibleDuplicate) throw new Error(errorCode.MethodChunkAlreadyExists);

    data = {
      ...data,
      creator: req.user.username,
      published: false,
    };

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
        'characteristics': m['characteristics'],
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

exports.delete = async (req, res, next) => {
  try {
    const { name_id } = req.params;
    const { username } = req.user;
    const methodChunk = await MethodChunk.findOne({ nameId: name_id });
    if (!methodChunk) throw new Error(errorCode.MethodChunkNotFound);
    if (username !== methodChunk['creator']) {
      throw new Error(errorCode.NotAuthorized);
    }
    await MethodChunk.deleteOne({ nameId: name_id });
    res.json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const { username } = req.user;
    const data = req.body || {};

    const errorMsgMethodInvalid = isMethodChunkValid(data);
    if (errorMsgMethodInvalid) {
      throw new Error(errorMsgMethodInvalid);
    }

    const { nameId } = data;
    const methodChunk = await MethodChunk.findOne({ nameId });
    if (!methodChunk) throw new Error(errorCode.MethodChunkNotFound);

    if (username !== methodChunk['creator']) {
      throw new Error(errorCode.NotAuthorized);
    }

    await MethodChunk.updateOne({ nameId }, data);
    res.json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

exports.publish = async (req, res, next) => {
  try {
    const { name_id: nameId } = req.params;

    const methodChunk = await MethodChunk.findOne({ nameId });
    if (!methodChunk) throw new Error(errorCode.MethodChunkNotFound);

    const methodChunkHeader = {
      nameId: methodChunk.nameId,
      name: methodChunk.name,
      description: methodChunk.description,
      characteristics: methodChunk.characteristics,
    };

    await fetch(Config.serviceRegistry.url, {
      method: 'POST',
      body: JSON.stringify(methodChunkHeader),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await MethodChunk.updateOne({ nameId }, { published: true });

    res.json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};
