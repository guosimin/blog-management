/**
 * 多条件组合排序
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2018/2/10      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */

/**
 * 多条件组合排序
 * @param array 数据源（数组对象）
 * 如：[
         {age:7,sex:0,grade:2,name:'lili'},
         {age:7,sex:1,grade:2,name:'coco'},
         {age:5,sex:1,grade:1,name:'cc'},
         {age:7,sex:0,grade:1,name:'mm'},
         {age:7,sex:1,grade:3,name:'ggg'},
         {age:6,sex:1,grade:3,name:'kk'},
         {age:7,sex:0,grade:3,name:'ff'},
     ];
 * @param condition 条件数组
 * 如：['grade','sex','age']
 *
 */
module.exports = function (array,conditionArray) {
    /**
     * 多条件排序
     * @param Array 数组
     * @param condition 排序条件顺序组
     * @param condition 按第几个条件筛选
     */
    var endArray = [];
    function multiSortFn(params,condition,num) {
        var num = num||0;
        var groupArray = group(params,condition[num]);
        var groupArrayIndex = [];
        for(var key in groupArray){
            groupArrayIndex.push(key);
        }
        var groupArrayIndex = groupArrayIndex.sort();
        for(var i = 0; i<=groupArrayIndex.length;i++){
            if(groupArray[groupArrayIndex[i]]){
                if(groupArray[groupArrayIndex[i]].length>1){
                    multiSortFn(groupArray[groupArrayIndex[i]],condition,(num+1));
                }else{
                    endArray = endArray.concat(groupArray[groupArrayIndex[i]]);
                }
            }
        }
    }

    /**
     * 排序
     * @param params
     * @param condition
     * @returns {*}
     */
    function sort(params,condition) {
        for(var i=0;i<params.length-1;i++){
            for(var j=i+1;j<params.length;j++){
                if(params[i][condition]>params[j][condition]){//如果前面的数据比后面的大就交换
                    var temp=params[i];
                    params[i]=params[j];
                    params[j]=temp;
                }
            }
        }
        return params;
    }

    /**
     * 分组
     * @param params
     * @param condition
     * @returns {Array}
     */
    function group(params,condition) {
        var groupArray = [];
        for(var i = 0;i<params.length;i++){
            if(groupArray[params[i][condition]]){
                groupArray[params[i][condition]].push(params[i]);
            }else{
                groupArray[params[i][condition]] = [params[i]];
            }
        }
        return groupArray;
    }

    multiSortFn(array,conditionArray);
    return endArray;
}