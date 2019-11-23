const nim = require('nim');

const main = () => {
  const userListKey = 'chat_demo_user_list/';
  const redis = nim.redis()

  return redis.smembersAsync(userListKey).then(userlist => {
    return { returnCode: 0, userlist };
  })
};

exports.main = main;
