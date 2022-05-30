const User = require('../model/user/model.user');

const findByLogin = (login, callback) => {
  User.findOne({ login }, {}, (error, user) => {
    if (error) {
      callback(error);
    } else {
      callback(null, user);
    }
  });
};

const createUser = (userData, callback) => {
  const user = new User({
    username: userData.username,
    login: userData.login,
    password: userData.password,
    contacts: [],
  });

  user.save((error) => {
    if (error) {
      callback(error);
    } else {
      callback(null, user);
    }
  });
};

const getContacts = (userId, callback) => {
  User.findById(userId).populate('contacts', ['username']).exec((error, contacts) => {
    if (error) {
      callback(error)
    } else {
      callback(null, contacts)
    }
  })
};

module.exports = {
  createUser,
  findByLogin,
  getContacts,
};
