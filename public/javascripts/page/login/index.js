/**
 * 登录
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2018/10/29      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */

import Vue from 'vue';

$(document).ready(function () {
    //vue实例
    let vue;
    /**
     * 绑定事件
     */
    let bind ={
        // 登录方法
        __login:function () {
            //点击了提交按钮
            vue.$set(vue.params, 'isSubmit', true);
            console.log(vue);
            if(!(vue.params.name!=''&&vue.params.password!='')){
                layer.msg('请输入账号或密码');
                return false;
            }
            if(!vue.params.verify){
                layer.msg('请滑动验证码');
                return false;
            }
            //验证
            bind.__verify(function (resp) {
                if(resp.vaild){
                    location.href = '/';
                }else{
                    layer.msg('你所输入的账号或密码错误，请重新输入');
                }
            });
        },
        //验证
        __verify:function (callback) {
            $.ajax({
                url: "/api/login",
                method : 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    name:vue.params.name,
                    password:vue.params.password
                }),
                dataType: 'json',
                success: function(resp){
                    if(typeof callback == 'function'){
                        callback(resp);
                    }
                }
            });
        }
    }


    /**
     * 初始化vue
     * @private
     */
    function _initVue() {
        vue = new Vue({
            el:'#app',
            data:{
                params:{
                    name:'',
                    password:'',
                    verify:false,//验证码通过
                    isSubmit:false
                }
            },
            methods:{
                login:bind.__login
            }

        });
    }

    /**
     * 渲染验证组件
     * @private
     */
    function _renderVerify() {
        $('#mpanel1').slideVerify({
            type : 1,		//类型
            vOffset : 5,	//误差量，根据需求自行调整
            barSize : {
                width : '100%',
                height : '38px',
            },
            success : function() {
                // vue.$set(vue.params, 'verify', true);
                // vue.params.verify = true;
                vue.params = Object.assign({}, vue.params, { verify:true });
            }

        });
    }

    function _init() {
        _initVue();
        _renderVerify();
    }

    //-- =======================================初始化===========================================
    _init();
});