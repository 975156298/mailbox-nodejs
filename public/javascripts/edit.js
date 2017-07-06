$(document).ready(function(){
    createWE("editText");
});
function createWE(id){
    editor = new window.wangEditor('#'+id);
    editor.create();
}

function formvalidation_init(id,url){
    $('#'+id)
        .formValidation({
            message: '输入的值无效',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                toMail:{
                    validators:{
                        notEmpty: {
                            message: '收件人不能为空'
                        },
                        emailAddress: {
                            message: '请输入正确的邮箱形式'
                        }
                    }
                },
                title: {
                    validators: {
                        notEmpty: {
                            message: '标题不能为空'
                        }
                    }
                }
            }
        })
        .on('success.form.fv', function(e) {
            e.preventDefault();
        });
}
