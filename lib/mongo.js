var config = require('config-lite')(__dirname);
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});

exports.User = mongolass.model('User', {
    email: { type: 'string' },
    password: { type: 'string' },
    created_at: {type: 'string'}
});
exports.User.index({ email: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一

exports.Mail = mongolass.model("Mail",{
    toEmail:{type: Mongolass.Types.ObjectId},
    inEmail:{type: Mongolass.Types.ObjectId},
    title: {type: 'string'},
    text: {type: 'string'}
});
exports.Mail.index({_id: -1}).exec();