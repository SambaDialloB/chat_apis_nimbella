const nim = require('nim');
const validation = require('./validation');

const handleAddUser = (username) => {
  const userListKey = 'chat_demo_user_list/';
  const redis = nim.redis()
  return redis.sismemberAsync(userListKey, username).then(userExists => {
    if(userExists) {
      return { "returnCode": -1, "message": 'username has benn taken' };
    }
    return redis.saddAsync('chat_demo_user_list/', username).then(() => {
      return { "returnCode": 0, "username added": username };
    })
  })
};

const handleValidate = async (username) => {
  const usernameValidate = validation.username(username);

  if(!usernameValidate.result) {
    return { returnCode: -1, message: usernameValidate.message }
  }

  return { returnCode: 0 }
};

const main = (params) => {
  const username = params.username;
  console.log(username)
  return handleValidate(username).then(res => {
    if(res.returnCode === 0) {
      return handleAddUser(username).then(status => {
        return status
      });
    } else {
      return res;
    }
  });
};


exports.main = main;