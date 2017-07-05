$(document).ready(function () {
    selectAll();
    selected();
});

function selectAll(){
    $('#selectAll').click(function () {
        if( $('#selectAll').prop("checked")){
            $("input[type='checkbox']").prop("checked", true);
        }else{
            $("input[type='checkbox']").prop("checked", false);
        }
    })
}

function delMail(url){
    var mailId = [];
    $('input[name="checked"]').each(function() {
        if ($(this).prop('checked') ==true) {
            mailId.push($(this).val());
        }
    });
    if(mailId.length>0){
        getAjax(url+'?mailId=' + mailId,function(data){
            if(data.status == 200){
                showAlert(data.message,function(){
                    jumpPage('/mail/draft');
                })
            }
        });
    }else{
        showAlert("请至少选中一封邮件")
    }
}

function selected(){
    $("input[name='checked']").click(function(){
        $('input[name="checked"]').each(function() {
            if(!$(this).prop('checked')){
                $('#selectAll').prop("checked",false);
                return false;
            }else{
                $('#selectAll').prop("checked",true);
            }
        });
    })
}

function getPageData(num){
    if( JSON.parse($('#page').val()) >= JSON.parse(num)){
        jumpPage('/mail/draft?page='+ num);
    }else{
        jumpPage('/mail/draft?page='+ $('#page').val());
    }
}