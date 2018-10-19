/**
 * 管理博客列表
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2018/10/16      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */

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

$(document).ready(function () {
    function _init() {
        new Vue({
            el:'#app',
            data:{
                list:__DATA.list
            },
            filters:{
                date:function (date,format) {
                    if(isNaN(Number(date))){
                        return '';
                    }else{
                        return moment(new Date(Number(date))).format(format);

                    }
                }
            }
        })
    }

    //-- =======================================初始化===========================================
    _init();
});
