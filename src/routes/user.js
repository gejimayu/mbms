import User from '../controllers/user';

module.exports = api => {
  api.route('/register').post(User.register);
  api.route('/login').post(User.login);
};
