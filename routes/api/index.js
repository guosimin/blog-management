/**
 * 接口路由
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2018/11/26      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */

const router = require('koa-router')();
const mongodb = require('../common/mongo');
const md5 = require('md5-node');

router.prefix('/api');

// 登录
router.post('/login', async(ctx, next) => {
    let data = ctx.request.body;
    let mongoPostData = {
        tableName: 'user',
        obj:{
            last_time:Date.parse(new Date())
        },
        oldObj:{
            name:data.name,
            password:md5(data.password)
        }
    }
    let result = mongodb.update(mongoPostData);
    if(result&&result.length==1){
        await new Promise(function (resolve, reject) {
            ctx.response.body = {
                success:true,
                valid:true,
                message:'登录成功'
            };
            resolve();
        });
    }else{
        await new Promise(function (resolve, reject) {
            ctx.response.body = {
                success:true,
                valid:false,
                message:'登录失败'
            };
            resolve();
        });
    }
});

module.exports = router;