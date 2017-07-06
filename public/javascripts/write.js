$(document).ready(function(){
    createWE("text");
});

function createWE(id){
    editor = new window.wangEditor('#'+id);
    editor.create();

}

function saveDraft(id,url){
    $('#text').val(editor.txt.html());
    postAjax(url,$('#'+id).serialize(),function(data){
        if(data.status == 200){
            showAlert(data.message,function(){
                jumpPage('/mail/draft')
            })
        }else{
            showAlert(data.message);
        }
    })
}

function sendMail(id,url){
    $('#text').val(editor.txt.html());
    postAjax(url,$('#'+id).serialize(),function(data){
        if(data.status == 200){
            showAlert(data.message,function(){
                jumpPage('/main')
            })
        }else{
            showAlert(data.message);
        }
    });
}