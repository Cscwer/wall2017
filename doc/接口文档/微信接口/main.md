4.0 微信接口

主要是微信 jssdk 方面的接口 

# 关于 vwx 

vwx 是对微信接口的第二层封装，第一层是 `wx.promise` 将接口全部 promisify。 

而且，网页 url 变动的时候无须自行重设 wx.config, vwx 内部都会完全自动地处理好，无须担心，尽管使用。 

还有就是 vwx 上所有方法返回的都是 promise 
