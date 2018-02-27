/**
 * 判断两个对象是否相等
 *
 * Author:   gsm(qq:865316371)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2018/1/12      1.0     First version
 *
 * */

/**
 * 判断两个对象是否相等
 * @param [object] obj1 对象1
 * @param [object] obj2 对象2
 */
module.exports = function (obj1,obj2){
    var stringA = JSON.stringify(obj1);
    var stringB = JSON.stringify(obj2);
    return stringA==stringB;
}