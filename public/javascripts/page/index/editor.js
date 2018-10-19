/**
 * 编辑博客
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2018/10/16      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */

import Vue from 'vue';

$(document).ready(function () {
    //-- =======================================变量===========================================
    //编辑器实例
    let editor;
    let params = {
        list:(__DATA&&__DATA.list&&__DATA.list[0])||{}
    }

    //-- =======================================函数===========================================
    //绑定
    function _bind() {
        //重置
        $("#input-area__clear").click(function () {
            _clearEditor();
        });

        //提交按钮
        $(".input-area__btn,#input-area__save").click(function () {
            _submit($(this).data("type"));
        });
    }

    //初始化编辑器
    function _initEditor() {
        let E = window.wangEditor;
        let domName = "#input-area__textarea";
        if($(domName).length>0){
            editor = new E(domName);
            editor.customConfig.uploadImgShowBase64 = true;
            editor.create();
            editor.txt.html(params.list.desc||'');
        }
    }

    //清空编辑器
    function _clearEditor() {
        $("#input-area__input,#input-area__categories").val('');
        editor.txt.clear();
    }

    //提交
    function _submit(type) {
        if($("#input-area__input").val()&&editor.txt.html()){
            let time = moment();
            console.log(params.list&&params.list.length>0);
            $.ajax({
                url: "/fs",
                method : 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    title:$("#input-area__input").val(),
                    desc:editor.txt.html(),
                    categories:$('#input-area__categories').val(),
                    time:time.format('YYYY-MM-DD'),
                    dataType:type,
                    oldObj:params.list,
                    isEditor:__DATA.list&&__DATA.list.length>0
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
    }

    //初始化
    function _init() {
        var a = new Vue({
            el: '#app',
            data: {
                list: Object.assign({}, params.list)
            },
            mounted:function () {
                _initEditor();
            }
        });
        _bind();
    }

    //-- =======================================初始化===========================================
    _init();

});