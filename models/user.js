var User = require('../lib/mongo').User;

module.exports = {
    // 注册一个用户
    create: function create(user) {
        return User.create(user).addCreatedAt().exec();
    },
    getUser: function getUser(email) {
        return User
            .findOne({ email: email })
            .addCreatedAt()
            .exec();
    }
};
