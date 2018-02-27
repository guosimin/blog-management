/**
 * 数组-去重
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2018/1/13      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */

/**
 * 数组-去重
 * @param {Array}
 * @return {Array}
 */
module.exports = function (param) {
    var ret = [];
    var hash = {};
    for (var i = 0; i < param.length; i++) {
        var item = param[i];
        var key = typeof (item) + item;
        if (hash[key] !== 1) {
            ret.push(item);
            hash[key] = 1;
        }
    }
    return ret;
}