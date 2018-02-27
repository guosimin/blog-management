/**
 * 判断是否空数组
 *
 * Author:   gsm(qq:865316371)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2018/1/12      1.0     First version
 *
 * */


/**
 * 判断是否空数组
 * @param value 数据
 * @returns {boolean}
 */
module.exports = function (value) {
    if (value && value.length > 0) {
        return false;
    }
    return true;
}