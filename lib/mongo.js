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
    toMail: {type: 'string'}, //收件人 == 别人
    inMail: {type: Mongolass.Types.ObjectId}, //发件人 == 自己
    title: {type: 'string'},
    text: {type: 'string'},
    state: {type: 'string'},  //0代表已发送，1代表发送失败，2代表存草稿，3代表已读。
    created_at: {type: 'string'},
    updated_at: {type: 'string'}
});
exports.Mail.index({_id: -1}).exec();