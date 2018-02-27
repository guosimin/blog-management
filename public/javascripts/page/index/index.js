/**
 * 发布博客页
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2018/1/12      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */


//生成文档编辑器
var E = window.wangEditor;
var editor = new E('#input-area__textarea');
editor.customConfig.uploadImgShowBase64 = true;
editor.create();

//监听提交
$("#input-area__btn").click(function () {
    if($("#input-area__input").val()&&editor.txt.html()){
        var time = moment();
        $.ajax({
            url: "/fs",
            method : 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                title:$("#input-area__input").val(),
                desc:editor.txt.html(),
                categories:$('#input-area__categories').val(),
                time:time.format('YYYY-MM-DD'),
                date:moment().format('YYYY-MM-DD HH:mm:ss')
            }),
            dataType: 'json',
            success: function(){
                consol.log("保存成功");
            }
        });
    }else{
        layer.msg('请输入标题和内容');
    }
});

/**
 * 重置
 */
$("#input-area__clear").click(function () {
    $("#input-area__input").val('');
    editor.txt.clear();
});