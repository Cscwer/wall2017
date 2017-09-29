# API 文档说明 

每一个接口分两部分，一份是公共的约定，一份是具体的约定，**在具体的约定里面不会有关于公共的约定的任何内容。**

# 特别说明 

在接口返回的数据中，请无视 `__v` 字段，这是 Mongoose 自己加上去的，无须理会。 

# 公共约定

全局公共状态码 

1. `2000` 请求成功  
2. `4000` 缺少参数或数据校验失败 

## GET /user/me 
这个接口用户 `获取请求者的用户信息` 

无须参数即可使用 

返回值参考： 

``` js
{
    // 背景图片
    bg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAE0lEQVQImWPcvXv3fwYgYGKAAgAxOAM0xpONdQAAAABJRU5ErkJggg==",
    created_at: "2017-09-27T10:15:05.611Z",
    headimgurl: "http://wx.qlogo.cn/mmopen/vi_32/sBlxQJd2SyVeyroibMblibJyoINHpLnfPwGDib8mNzfMibAsrdxeSOyYqOtYjrglx04mJ2TeM3Pr4juMKjpHJJFcZA/0",
    nickname: "eczn",
    // id
    openid: "opdbdwdWXWMg9UY72Z4i_DTcblR0",
    phone: "未设置",
    ps: "这个懒虫没有设置签名 ~ ",
    sex: 0,
    __v: 0,
    // 用户索引
    _id: "59cb7a292400a81eb8d8a467"
}
```
