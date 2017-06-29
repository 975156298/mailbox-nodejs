$(document).ready(function () {
    $('#register')
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
                        remote: {
                            url: '/register/user',
                            message: '用户名已存在'
                        },
                        emailAddress: {
                            message: '请输入正确的邮箱形式'
                        }
                    }

                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        }
                    }
                },
                rePassword: {
                    validators: {
                        identical: {
                            field: 'password',
                            message: '密码不一致'
                        }
                    }
                }
            }
        })
        .on('success.form.fv', function (e) {
            e.preventDefault();
            $.ajax({
                url: '/register',
                type: 'POST',
                data: $('#register').serialize(),
                success: function (result) {
                    console.log(result);
                    if (result.status == 200) {
                        $("#register").data('formValidation').resetForm(true);//重置表单
                        show_alert(result.message,function(){
                            jumpPage('/signin')
                         });
                    } else {
                        show_alert(result.message)
                    }
                }
            });
        });
})
;

function save_user_info() {
    $('#register').data('formValidation').validate();
}