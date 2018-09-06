/**
 * blog
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2018/9/6      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */

module.exports = function (data) {
    var template = `---
layout: post
title:  "${data.title}"
date:    ${data.date+" +0800"}
categories: "${data.categories?(data.categories+'...'):''}"
tags: ["chrome"]
---
${data.desc}
`;
    return template;
}
