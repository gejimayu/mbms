import expressJwt from 'express-jwt';

import config from '../config';

export default expressJwt({ secret: config.jwt.secret });
