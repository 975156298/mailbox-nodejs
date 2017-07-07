

$(document).ready(function(){
    editor = new window.wangEditor('#editText');
    editor.customConfig.menus = [];
    editor.create();
});

function showMail(id,mailId,toMail,title,text,isread){
    $('#'+id).addClass('hide');
    $('#edit').removeClass('hide');
    $('#mailId').val(mailId);
    $('#toMail').val(toMail);
    $('#title').val(title);
    editor.txt.html(text);
    var data = {
        id: mailId
    };
    if(isread == '1'){
        postAjax('/mail/',data,function(data){
            console.log(data)
        });
    }
}