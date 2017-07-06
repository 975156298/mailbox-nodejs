$(document).ready(function(){
    createWE("editText");
});
function createWE(id){
    editor = new window.wangEditor('#'+id);
    editor.create();

}
