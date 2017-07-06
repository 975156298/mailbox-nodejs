var Mail = require('../lib/mongo').Mail;

module.exports = {
    create: function create(mail){
        return Mail.create(mail).exec();
    },
    update: function update(id,data){
        return Mail.update({_id: id},{$set: data}).exec();
    },
    delMail: function delMail(id){
        return Mail.remove({_id: id}).exec();
    },
    getSendMail: function getSendMail(inMail,state,page){  //获取发送的邮件
        var start = (page -1) * 10;
        return Mail
            .find({inMail: inMail,state: state})
            .populate({ path: 'inMail', model: 'User' })
            .skip(start)
            .limit(10)
            .sort({_id: -1})
            .exec();
    },
    getAcceptMail: function getAcceptMali(toMail,page){  //获取接受的邮件
        var start = (page -1) * 10;
        return Mail
            .find({toMail: toMail})
            .populate({ path: 'inMail', model: 'User' })
            .skip(start)
            .limit(10)
            .sort({_id: -1})
            .exec();
    },
    getDraftMail: function getDraftMail(inMail,state,page){
        var start = (page -1) * 10;
        return Mail
            .find({inMail: inMail,state: state})
            .populate({path:'inMail',model:'User'})
            .skip(start)
            .limit(10)
            .sort({_id: -1})
            .exec();
    },
    getMailNum: function getMailNum(data){
        return Mail.count(data).exec();
    }

};