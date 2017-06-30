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
            mailId.push($(this).val())
        }
    });
    getAjax(url+'?mailId=' + mailId,function(data){
        if(data.status == 200){
            showAlert(data.message,function(){
                jumpPage('/mail/draft')
            })
        }
    });
    console.log(mailId)
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