前端部分

此篇目将讲述如何使用许愿墙的弹出层 

弹出层控制器已经被挂在 Vue 的原型上了，因此在 Vue 实例上都可以直接访问到控制器

详情请见 main.js 里关于 `GwPopup` 的设定

# 使用吐司 

``` js
created(){
    this.$popup.toast({
        msg: '0v0', 
        // 位置 
        position: 'top', 
        // 是否需要 `取消按钮`  默认 false 
        cancelable: true,
        // 水平居中 默认 false
        align: true, 
        // 持续时间单位毫秒 默认 3000 
        duration: 8000
    })
}
```

## 截图 
![toast](/images/use_toast.jpg)



# 基础使用之使用 alert, prompt, confirm  

``` js
let popupInstance = this.$popup.push({
    // 可以是 alert 也可以是 prompt 也可以是 confirm 
    type: 'alert', 
    confirmText: '确定', 
    cancelText: '否定',
    // placeholder 仅在 type 为 prompt 的时候生效 
    placeholderText: '输入给她的留言', 
    // 背景模糊 
    needBlur: true, 
    handle: {
        confirm(e){
            console.log('yes', this);
            console.log('参数', e); 
        },
        cancel(){
            console.log('no')
            this.close(); 
        }
    }
})
```


调用 push 将会返回 popup 实例 popupInstance, 执行 close 方法可以关闭这个实例。 


![alert](/images/use_alert.png)
![confirm](/images/use_confirm.png)
![prompt](/images/use_prompt.png)

# 高级运用之 modal, pushWith

``` js
import mycomponent from 'xxxx.vue'; 

let myModal = this.$popup.push({
    type: 'modal', 
    component: mycomponent
}); 

myModal.launch(); 
```

modal 的实现也是依赖 push 的，不过 type 应该填入 `modal`, 该函数将会返回一个 modal 实例，上面有 launch 方法，调用 launch 的时候页面就会被推入。 

---

还有一种情况就是，想要用 confirm 的样式，但是内部是自定义的。 这种情况只需要显式地给出对应组件就可以了。 

``` js
let ins = this.$popup.push({
    type: 'confirm', 
    confirmText: 'yes', 

    //  若无此项 则使用默认样式
    component: {
        template: `<h1> 你好 </h1>`
    }
}); 

ins.launch(); 
```

![use_mix](/images/use_mix.png)

# other

不懂的可以找我。。。。 