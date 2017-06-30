var Mail = require('../lib/mongo').Mail;

module.exports = {
    create: function create(mail){
        return Mail.create(mail).exec();
    },
    getSendMail: function getSendMail(inMail){
        return Mail
            .find({inMail: inMail})
            .populate({ path: 'inMail', model: 'User' })
            .sort({_id: -1})
            .exec();
    },
    getAcceptMail: function getAcceptMali(toMail){
        return Mail
            .find({toMail: toMail})
            .populate({ path: 'inMail', model: 'User' })
            .sort({_id: -1})
            .exec();
    }
};