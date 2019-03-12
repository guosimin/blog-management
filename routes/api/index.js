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
const crypto = require("crypto");

router.prefix('/api');

// 登录
router.post('/login', async(ctx, next) => {
    let data = ctx.request.body;
    let md5 = crypto.createHash("md5");
    //123abc a906449d5769fa7361d7ecc6aa3f6d28
    let newPassWord = md5.update(data.password).digest("hex");
    let mongoPostData = {
        tableName: 'users',
        obj:{
            last_time:Date.parse(new Date())
        },
        oldObj:{
            name:data.name,
            password:newPassWord
        }
    }
    let result = await mongodb.update(mongoPostData);
    let isSuccess = result&&result.length==1?true:false;
    await new Promise(function (resolve, reject) {
        ctx.response.body = {
            success:true,
            valid:isSuccess,
            message:isSuccess?'登录成功':'登录失败'
        };
        resolve(result);
    });
});

module.exports = router;