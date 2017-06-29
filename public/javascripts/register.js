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
                    message: '用户名出错',
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        },
                        stringLength: {
                            min: 6,
                            max: 16,
                            message: '用户名的长度在6-16之间(包括6/16)'
                        },
                        remote: {
                            url: '/register/user',
                            message: '用户名已存在'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: '用户名只能由字母、数字、点和下划线组成'
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
                rsPassword: {
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
                        /*show_alert(result.message,function(){

                         });*/
                    } else {
                        show_alert(result.message)
                    }
                }
            });
        });
});

function save_user_info() {
    $('#register').data('formValidation').validate();
}