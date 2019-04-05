import { errorCode } from '../constants';
import logger from './logger';

export default (err, req, res, next) => {
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
  } else if (err.name === errorCode.InvalidMethodChunk) {
    res.status(400).send({
      status: 'error',
      message: errorCode.InvalidMethodChunk,
    });
  }
  logger.error(err.stack);
  res.status(500).send({
    status: 'error',
    message: err.message || 'Something broke!',
  });
};
