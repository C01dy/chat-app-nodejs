const Token = require('../model/token/model.token');

const setRefreshToken = (token, userId, callback) => {
  const newRefreshToken = new Token({ token, userId });

  newRefreshToken.save((error) => {
    if (error) {
      callback(error);
    } else {
      callback(null, newRefreshToken);
    }
  });
};

const getRefreshToken = (token, callback) => {
  Token.findOne({ token }, {}, (error, newRefreshToken) => {
    if (error) {
      callback(error);
    } else {
      callback(null, newRefreshToken);
    }
  });
};

module.exports = {
  setRefreshToken,
  getRefreshToken,
};
