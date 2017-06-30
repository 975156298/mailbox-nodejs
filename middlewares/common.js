/**
 * Created by hzm on 17-6-30.
 */
function nowDate(){
    var now_date = new Date();
    var year = now_date.getFullYear();
    var month=now_date.getMonth()+1>9 ? now_date.getMonth()+1 : '0'+(now_date.getMonth()+1);
    var data=now_date.getDate()>=10 ? now_date.getDate() : '0'+now_date.getDate();
    var time = now_date.getHours()>=10 ? now_date.getHours() : '0'+now_date.getHours();
    var minutes = now_date.getMinutes() >=10 ? now_date.getMinutes() : '0'+now_date.getMinutes();
    var date =year+'-'+month+'-'+data + ' ' +time+ '-' + minutes;
    return date;
}

module.exports = {
    nowDate: nowDate
};