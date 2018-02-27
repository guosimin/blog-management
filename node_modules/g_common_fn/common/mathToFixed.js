/**
 * 数字-四舍五入
 *
 * Author:   gsm(qq:865316371)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2018/1/13      1.0     First version
 *
 * */

/**
 * 数字-四舍五入
 * @param param 数字
 * @param num 保留位数
 */
module.exports = function (param,num) {
    num = num || 0;
    var powNum = Math.pow(10, num);
    return Math.round(param * powNum) / powNum;
}