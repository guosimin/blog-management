/**
 *
 *
 * Author:   gsm(qq:865316371)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2018/1/12      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */

module.exports = {
    /**
     * 功能类
     */
    //复制
    copy:require('./common/copy'),
    //数组去重
    arrayUnique:require('./common/arrayUnique'),
    //通过名字获取url参数
    getUrlParamsByName:require('./common/getUrlParamsByName'),
    //多条件排序
    multiSort:require('./common/multiSort'),

    /**
     * 判断类
     */
    //判断两个对象是否相等
    isEqualObj:require('./common/isEqualObj'),
    //判断是否空数组
    isEmptyArray:require('./common/isEmptyArray'),

    /**
     * 数字处理类
     */
    //数字-四舍五入
    mathToFixed:require('./common/mathToFixed'),
    //数字-精确相乘
    matchMultiply:require('./common/matchMultiply'),
}
