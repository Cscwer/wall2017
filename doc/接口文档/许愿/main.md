# 电台 

在此说明许愿相关的接口和数据库设计 

# 数据库设计 

``` js
let wishSchema = mongoose.Schema({
    who: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    }, 
    text: {
        type: String, 
        default: ''
    }, 
    img: {
        type: String
    },
    // Status: 
    // 0 =>  待领取 
    // 1 =>  待实现 
    // 2 =>  已完成 
    status: {
        type: Number,
        default: 0, 
        min: 0, 
        max: 2
    },
    wishtype: {
        type: Number,
        default: 0, 
        min: 0, 
        max: 1
    },
    created_at: {
        type: Date, 
        default: Date.now
    },
}); 
```
