2.0 暗恋匹配

本文件重在讲述 暗恋匹配 的逻辑以及相关接口 

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







