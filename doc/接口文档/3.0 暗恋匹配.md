2.0 暗恋匹配

本文件重在讲述 暗恋匹配 的逻辑以及相关接口 

# 数据库设计 

新建了一个 Schema 用于约束

``` js
let taSchema = mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true, 
        unique: true
    }, 
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    }, 
    created_at: {
        type: Date, 
        default: Date.now
    }
});
```

# 逻辑解释 

现有两人 A B，只要他们同时互相暗恋，即匹配成功，详细的、所有的、不重复的情况如下： 

1. A 暗恋 B，B 也暗恋 A，匹配成功 
2. A 暗恋 B，B 却不暗恋 A，匹配失败
3. A 没有暗恋任何人，B 也是，匹配失败

而且，还需要搜索用户，据此设计如下接口 :

1. `GET  /api/ta`
2. `POST /api/ta`
3. `GET /api/pingpong`


# 接口说明

> 相关文件 `./server/routes/ta.js` , `./server/routes/user.js`

## GET /api/ta 

**[ TIP ]** 返回用户暗恋的人的信息 

**[ PARAM ]** 无须参数，直接调用 

**[ RESPONSE ]** 返回值参考 user 表, 比如： 

``` json
{
    "code": 2000,
    "data": {
        "_id": "59ce8acd6323dc1764274869",
        "to": {
            "_id": "59ce82b6013ab732301dc8d7",
            "openid": "002-openid-fake",
            "nickname": "我是eczn的爱人",
            "sex": 0,
            "headimgurl": "http://wx.qlogo.cn/mmopen/vi_32/sBlxQJd2SyVeyroibMblibJyoINHpLnfPwGDib8mNzfMibAsrdxeSOyYqOtYjrglx04mJ2TeM3Pr4juMKjpHJJFcZA/0",
            "__v": 0,
            "created_at": "2017-09-29T17:28:22.850Z",
            "phone": "未设置"
        },
        "from": {
            "_id": "59ce826c4fece5203cd318c7",
            "openid": "opdbdwdWXWMg9UY72Z4i_DTcblR0",
            "nickname": "eczn",
            "sex": 0,
            "headimgurl": "http://wx.qlogo.cn/mmopen/vi_32/sBlxQJd2SyVeyroibMblibJyoINHpLnfPwGDib8mNzfMibAsrdxeSOyYqOtYjrglx04mJ2TeM3Pr4juMKjpHJJFcZA/0",
            "__v": 0,
            "created_at": "2017-09-29T17:27:08.773Z",
            "phone": "未设置"
        },
        "__v": 0,
        "created_at": "2017-09-29T18:02:53.726Z"
    },
    "msg": "接口调用成功"
}
```

## POST /api/ta 

**[ TIP ]** 在未设置过用户所爱之人的情况下设置它的所爱之人 

**[ PARAM ]** 需要参数： 

只需要 `to` 字段, 该接口内部还有一个字段 `from` 由后台在cookie中取得，对前端透明。

``` js
http.post('/api/ta', {
    to: '用户暗恋的人的 _id'
})
```

**[ RESPONSE ]** 将返回记录值，详情参考 ta 表, 比如： 

``` json
{
    "code": 2000,
    "data": {
        "__v": 0,
        "to": "59ce82b6013ab732301dc8d7",
        "from": "59ce826c4fece5203cd318c7",
        "_id": "59cf1a072073444c384d57fa",
        "created_at": "2017-09-30T04:13:59.709Z"
    },
    "msg": "接口调用成功"
}
```


**[ ERROR ]** 调用这个接口可能被服务器驳回

如果暗恋自己，会报状态码为 `4100` 的如下错误：

``` json
{
    "code": 4100,
    "data": {
        "to": "59ce826c4fece5203cd318c7",
        "from": "59ce826c4fece5203cd318c7"
    },
    "msg": "请勿暗恋自己喔"
}
```

如果是第二次设置暗恋对象，则会报 `4005`

``` json
{
    "code": 4005,
    "data": {},
    "msg": "该接口只能调用一次请勿重复调用"
}
```


## GET /api/pingpong

**[ TIP ]** 判断是否暗恋匹配成功，即判断用户暗恋的人是否也暗恋用户。 

**[ PARAM ]** 无须参数，直接调用即可

**[ RESPONSE ]** 返回值参考 

有两种情况，一种是成功，一种是失败： 

先是成功, 返回值会填充 ta 表中的相应的文档： 

``` json
{
    "code": 2000,
    "data": {
        "_id": "59cf1c93d5b9594044364cee",
        "to": {
            "_id": "59ce82b6013ab732301dc8d7",
            "openid": "002-openid-fake",
            "nickname": "我是eczn的爱人",
            "sex": 0,
            "headimgurl": "头像链接",
            "__v": 0,
            "created_at": "2017-09-29T17:28:22.850Z",
            "phone": "未设置"
        },
        "from": {
            "_id": "59ce826c4fece5203cd318c7",
            "openid": "opdbdwdWXWMg9UY72Z4i_DTcblR0",
            "nickname": "eczn",
            "sex": 0,
            "headimgurl": "头像链接",
            "__v": 0,
            "created_at": "2017-09-29T17:27:08.773Z",
            "phone": "未设置"
        },
        "__v": 0,
        "created_at": "2017-09-30T04:24:51.742Z"
    },
    "msg": "接口调用成功"
}
```

第二种是，匹配失败，用户暗恋的人并不暗恋用户或用户没有暗恋对象： 

``` json
{
    "code": 2000,
    "data": null,
    "msg":"接口调用成功"
}
```
