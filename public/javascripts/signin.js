
$(document).ready(function () {
    $('#signin')
        .formValidation({
            message: '输入的值无效',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                email: {
                    validators: {
                        notEmpty: {
                            message: '邮箱不能为空'
                        },
                        emailAddress: {
                            message: '请输入正确的邮箱形式'
                        }
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    }
                }
            }
        })
        .on('success.form.fv', function (e) {
            e.preventDefault();
            $.ajax({
                url: '/signin',
                type: 'POST',
                data: $('#signin').serialize(),
                success: function (result) {
                    if (result.status == 200) {
                        $("#signin").data('formValidation').resetForm(true);//重置表单
                        showAlert(result.message,function(){
                            jumpPage('/main')
                        });
                    } else {
                        showAlert(result.message)
                    }
                }
            });
        });
})
;

function signin() {
    $('#signin').data('formValidation').validate();
}