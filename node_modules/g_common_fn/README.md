# g_common_fn
common method 一些常用的方法

## 安装
```javascript 
npm install --save-dev g_common_fn
```

## 例子
```javascript 

var commonFn = require('g_common_fn');
commonFn.copy("要复制的内容");

```


## 主要方法：

#### 功能类
1.copy(data,successFn,errorFn)
> 复制指定内容

2.arrayUnique(param)
> 数组去重

3.getUrlParamsByName(name,url);
> 通过名字获取url参数

3.multiSort(name,url);
> 多条件组合排序


#### 判断类
1.isEqualObj(obj1,obj2)
> 判断两个对象是否相等

2.isEmptyArray(value)
> 判断是否空数组


#### 数字处理类
1.mathToFixed(param1,param2)
> 数字-四舍五入

2.matchMultiply(param1,param2)
> 数字-精确相乘
