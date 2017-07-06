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
    formvalidation_init(id,url);
    if($('#'+id).data('formValidation').validate().isValid()){
        postAjax(url,$('#'+id).serialize(),function(data){
            if(data.status == 200){
                showAlert(data.message,function(){
                    jumpPage('/main');
                })
            }else{
                showAlert(data.message);
            }
        })
    }

}
