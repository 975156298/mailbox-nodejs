function jumpPage(url){
    window.location.href = window.location.protocol + '//' + window.location.host + url;
}

function signout(){
    getAjax('/signin/signout',function(data){
        if(data.status == 200){
            showAlert(data.message,function(){
                jumpPage('/signin')
            })
        }
    })
}

function postAjax(url, data, suc_fun, err_fun) {
    $.ajax({
        url: window.location.protocol + '//' + window.location.host+url,
        method: 'POST',
        data: data,
        success: function (data) {
            suc_fun(data)
        },
        error: function (err) {
            err_fun(err)
        }
    })
}

function getAjax(url,suc_fun,err_fun){
    $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
            suc_fun(data)
        },
        error: function () {
            err_fun()
        }
    })
}

function showAlert(message,cfm_fuc){
    $.alert({
        title: false,
        content: message,
        type: 'green',
        typeAnimated: true,
        animation:'rotate',
        autoClose: 'confirm|1500',
        buttons:{
            confirm: {
                text: '确定',
                keys: ['y'],
                action: cfm_fuc
            }
        }
    })
}

function showConfirm(message,cfm_fuc){
    $.confirm({
        title: false,
        content: message,
        type: 'green',
        typeAnimated: true,
        animation:'rotate',
        buttons:{
            confirm: {
                text: '确定',
                keys: ['y'],
                action: cfm_fuc
            },
            cancel:{
                text:'取消',
                keys: ['n','esc'],
                action: function(){}
            }
        }
    })
}