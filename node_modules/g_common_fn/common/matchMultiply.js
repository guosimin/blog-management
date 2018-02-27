/**
 * 数字-精确相乘
 *
 * Author:   gsm(qq:865316371)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2018/1/13      1.0     First version
 *
 * */

/**
 * 数字-精确相乘
 * @param param1 数字1
 * @param param2 数字2
 */
module.exports = function (param1,param2) {
    var m = 0,
        s1 = param1.toString(),
        s2 = param2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) { }
    try {
        m += s2.split(".")[1].length;
    } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}