# 广工2017许愿墙 

1. 客户端 `./client` 
2. 服务端 `./server`

# 环境配置

## 配置 Host 

为了骗过微信开发工具需要修改 host 文件, 使得 `gw.chenpt.cc` 解析到本地地址 : 

``` 
127.0.0.1  gw.chenpt.cc
```

## 配置反向代理

以 Apache 为例子，先要创建虚拟站点 `gw.chenpt.cc` 然后去修改 `vhost.conf` 文件： 

``` apache
<VirtualHost *:80>
    DocumentRoot "F:\gw.chenpt.cc"
    ServerName gw.chenpt.cc
    ServerAlias 
  <Directory "F:\gw.chenpt.cc">
      Options FollowSymLinks ExecCGI
      AllowOverride All
      Order allow,deny
      Allow from all
      Require all granted
  </Directory>
  
  ProxyRequests Off
  <Proxy *>
    Order deny,allow
    Allow from all
  </Proxy>
  
  ProxyPass /api http://127.0.0.1:6677/api
  ProxyPassReverse /api http://127.0.0.1:6677/api

  ProxyPass /app.js http://127.0.0.1:7766/app.js
  ProxyPassReverse /app.js http://127.0.0.1:7766/app.js
  
  ProxyPass / http://127.0.0.1:7766/
  ProxyPassReverse / http://127.0.0.1:7766/

</VirtualHost>
```

目的是把 gw.chenpt.cc/api 代理到 服务端 
gw.chenpt.cc/ 代理到 客户端 

防止出现叼毛跨域不方便开发

# 使用 

打开一个终端进入 `./server` 启动服务端 :

``` bash 
$ node ./bin/www
```

然后再开一个终端进入 `./client` 启动客户端 : 

``` bash 
$ npm run start 
```

然后即可开始开发。 
