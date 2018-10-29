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
    function _verify() {
        $('#mpanel1').slideVerify({
            type : 1,		//类型
            vOffset : 5,	//误差量，根据需求自行调整
            barSize : {
                width : '100%',
                height : '38px',
            },
            ready : function() {
            },
            success : function() {
                
            },
            error : function() {
            }

        });
    }
    function _init() {
        _verify();
    }

    //-- =======================================初始化===========================================
    _init();
});