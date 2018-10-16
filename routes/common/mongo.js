/**
 * 连接数据库
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2018/10/8      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';


module.exports = {
    /**
     * @param option
     * {
     *    tableName <String> 表名
     *    obj <object> 插入数据
     * }
     */
    create:function (option={}) {
        return new Promise(function (resolve,reject) {
            MongoClient.connect(url+'test', function (err, db) {
                if (err) throw err;
                console.log('数据库已创建');
                var dbase = db.db("blog");
                dbase.createCollection(option.tableName, function (err, res) {
                    if (err) throw err;
                    console.log("创建集合!");
                    db.close();
                });
            });
        })

    },
    /**
     * @param option
     * {
     *    tableName <String> 表名
     *    obj <object||Array> 插入数据
     * }
     */
    update:function (option={}) {
        return new Promise(function (resolve,reject) {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbase = db.db("blog");
                if(Array.isArray(option.obj)){
                    dbase.collection(option.tableName).insertMany(option.obj, function(err, res) {
                        if (err) throw err;
                        console.log("文档插入成功");
                        db.close();
                        resolve();
                    });
                }else{
                    dbase.collection(option.tableName).insertOne(option.obj, function(err, res) {
                        if (err) throw err;
                        console.log("文档插入成功");
                        db.close();
                        resolve();
                    });
                }

            });
        })
    },
    /**
     * @param option
     * {
     *    tableName <String> 表名
     *    obj <object> 查询数据
     * }
     */
    find:function (option={}) {
        return new Promise(function (resolve,reject) {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbase = db.db("blog");
                dbase.collection(option.tableName). find(option.obj).toArray(function(err, result) { // 返回集合中所有数据
                    if (err) throw err;
                    db.close();
                    resolve(result);
                });
            });
        })
    }
}