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
import Vue from 'vue';

//生成文档编辑器
let editor;
if($("#input-area__textarea").length>0){
    let E = window.wangEditor;
    let editor = new E('#input-area__textarea');
    editor.customConfig.uploadImgShowBase64 = true;
    editor.create();
}


//监听提交
$(".input-area__btn").click(function () {
    if($("#input-area__input").val()&&editor.txt.html()){
        let time = moment();
        let dataType = '';
        if($(this).data("type")=="html"){
            dataType = "html";
        }
        $.ajax({
            url: "/fs",
            method : 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                title:$("#input-area__input").val(),
                desc:editor.txt.html(),
                categories:$('#input-area__categories').val(),
                time:time.format('YYYY-MM-DD'),
                dataType:dataType,
                date:moment().format('YYYY-MM-DD HH:mm:ss')
            }),
            dataType: 'json',
            success: function(resp){
                layer.msg(resp.message, {
                    time: 2000, //2s后自动关闭
                    btn: ['知道了', '关闭']
                });
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
    $("#input-area__input,#input-area__categories").val('');
    editor.txt.clear();
});


var a = new Vue({
    el: '#app',
    data: {
        message: 23333
    }
});
