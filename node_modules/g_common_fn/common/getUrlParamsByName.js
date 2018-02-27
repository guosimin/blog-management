/**
 * 通过名字获取url参数
 *
 * Author:   gsm(qq:865316371)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2018/2/9      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */


/**
 * 通过名字获取url参数
 * @param name url参数名字
 * @param url url(非必填)
 * @returns {*}
 */
module.exports = function (name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}