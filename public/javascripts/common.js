function jumpPage(url){
    window.location.href = window.location.protocol + '//' + window.location.host + url;
}

function signout(){
    get_ajax('/signin/signout',function(data){
        if(data.status == 200){
            show_alert(data.message,function(){
                jumpPage('/signin')
            })
        }
    })
}

function post_ajax(url, data, suc_fun, err_fun) {
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

function get_ajax(url,suc_fun,err_fun){
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

function show_alert(message,cfm_fuc){
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

function show_confirm(message,cfm_fuc){
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