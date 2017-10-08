5.0 电台 

## 数据结构 

采用队列对抗并发，点歌的数据并不入库。 

## JSONP 搜索歌曲
此接口是第三方接口，是跨域的，由酷狗独家冠名提供。

``` js
http.searchMusic({
    keyword: '初音未来'
}).then(res => {
    console.log(res); 
})
```

其中 res 是酷狗给的数据，下面是其中一次搜索得到的res结果，供参考： 

``` js
{
    "status": 1,
    "error": "",
    "data": {
        "aggregation": ['此字段不用管，对应用逻辑无关'],
        "tab": "全部",
        "info": [
            {xxxxxxxxxxx}, {xxxxxxxxxxxxxx}
        ],
        "correctiontype": 0,
        "timestamp": 1506969255,
        "allowerr": 0,
        "total": 304,
        "istag": 0,
        "istagresult": 0,
        "forcecorrection": 0,
        "correctiontip": ""
    },
    "errcode": 0
}
```

info 是一个数组，里面为搜索结果，可以从中取得歌曲的 url 和 hash 供后续点歌使用，这里的搜索结果很长，就不写出来了，请自行 console.log 查看。 

## GET /api/music

**[ TIP ]** 获取当前正在播放的音乐 无须参数

**[ RESPONSE ]** 返回值参考 


## POST /api/music 

**[ TIP ]** 点歌 

**[ PARAM ]** 需要参数 如下所示： 

``` js
http.post('/api/music', {
    content: '我的愿望是世界核平',
    hash: 'xxxxxx'
});
```

**[ RESPONSE ]** 返回值参考 


## GET /api/music/reset 

**[ WARN ]** 此接口与电台逻辑无关，是为了方便开发设计的，它的功能是清空当前播放的音乐队列，需要参数。 

**[ PARAM ]** 此接口需要明文密码 如下所示 

``` js
http.get('/api/music/reset', {
    pwd: 'asd123'
}); 
```
