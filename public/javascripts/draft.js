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
        showConfirm('您确定删除邮件吗？',function(){
            getAjax('/mail/del?mailId=' + mailId,function(data){
                if(data.status == 200){
                    showAlert(data.message,function(){
                        jumpPage('/mail/' + url);
                    })
                }
            });
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
function getPageData(num,url){
    if( JSON.parse($('#page').val()) >= JSON.parse(num)){
        jumpPage('/mail/' + url + '?page='+ num);
    }else{
        jumpPage('/mail/' + url + '?page='+ $('#page').val());
    }
}
function getMail(url,state){
    jumpPage('/mail' + url+'?state=' + state);
}
function editMail(id,mailId,toMail,title,text){
    $('#'+id).addClass('hide');
    $('#edit').removeClass('hide');
    $('#mailId').val(mailId);
    $('#toMail').val(toMail);
    $('#title').val(title);
    editor.txt.html(text)
}
function changePage(id){
    $('#edit').addClass('hide');
    $('#'+id).removeClass('hide');
}

function mailManage(id,url,state){
    $('#state').val(state);
    $('#text').val(editor.txt.html());
    formvalidation_init(id,url);
    if($('#'+id).data('formValidation').validate().isValid()){
        postAjax(url,$('#'+id).serialize(),function(data){
            if(data.status == 200){
                showAlert(data.message,function(){
                    if(state == '2'){
                        jumpPage('/mail/draft')
                    }else{
                        jumpPage('/main')
                    }
                })
            }else{
                showAlert(data.message);
            }
        })
    }
}