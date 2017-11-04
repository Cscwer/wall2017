<template>
    <div>
        <div class="head">
            {{from.nickname}}
        </div>
        <div class="msg-outter"　:style="{height: screenHeight + 'px'}"> 
            <div class="msg-wrap">
                <div v-for="(msg, idx) in list" :key="idx" class="msg-container" 
                    :style="{justifyContent: msg.myself ? 'flex-end': 'flex-start'}">
                    <img :src="from.headimgurl" class="avatar" v-if="!msg.myself">
                    <p :class="{ 
                        'left-content': !msg.myself,
                        'right-content': msg.myself
                    }">{{msg.content}}</p>
                </div>
            </div>
        </div>

        <div class="footer-wrap">
            <input v-model="message" type="text" class="input" placeholder="输入">
            <button class="send-button" @click="send()">发送</button>
        </div>
        
    </div>
</template>

<script>
import LsArray from '@/utils/ls/LsArray';
import ws from '@/utils/ws.client';

let chats_global = null; 

export default {
    props: ["chat-selected"],
    data() {
        return {
            list: [],
            from: this.chatSelected.from,
            message: "",
            screenHeight: window.innerHeight
        }
    },
    created() {
        console.log(window.innerHeight);
        // console.log("chat created");
        // console.log(this.chatSelected);
        // this.$emit("sayHello", "222");
        console.log(this.chatSelected);
        let id = this.chatSelected.from._id;
        let ns = "chat-msgs-";
        let chats = new LsArray(ns+id);

        this.list = chats.toArray();
        chats_global = chats; 

        console.log(chats.toArray());
    },
    methods: {
        send() {
            let msg = {
                content: this.message,
                her_id: this.from._id
            }
            ws.socket.emit('revMsg',msg);

            msg.myself = true; 
            chats_global.push(msg);
            this.list.unshift(msg);
        }
    }


}    
</script>

<style scoped>
    .head {
        position: fixed;
        width: 100%;
        background-color: #fff;
        font-size: 16px;
        color: #777;
        z-index: 20;
        margin-bottom: 20px;
        text-align: center;
        line-height: 50px;
        box-shadow: 0px 5px 15px 0px rgba(255, 150, 140, .3);
    }

    .msg-outter {
        position: fixed;
        width: 100%;
        overflow: scroll;
        margin-top: 70px;
        padding-bottom: 55px;
        box-sizing: border-box;
    }

    .msg-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 15px;
    }

    .msg-wrap {
        display: flex;
        flex-direction: column-reverse;
        padding-left: 10px;
        margin-bottom: 50px;
    }

    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50% 50%;
    }

    .left-content {
        margin: 5px 15px 10px 10px;
        font-size: 16px;
        color: #555;
        padding: 12px;
        border-radius: 24px 24px 24px 3px;
        box-shadow: 4px 4px 7px 0px rgb(255,200,200)
    }

    .right-content {
        margin: 5px 15px 10px 10px;
        font-size: 16px;
        color: #555;
        padding: 12px;
        border-radius: 24px 24px 3px 24px;
        box-shadow: 4px 4px 7px 0px rgb(255,200,200)
    }

    .input {
        flex: 1;
        width: 70%;
        color: #666;
        font-size: 16px;
        border: none;
        padding: 12px 0px 12px 20px;
        background-color: rgb(250,236,236);
    }

    .send-button {
        margin-right: 8px;
        color: #fff;
        font-size: 14px;
        border: none;
        border-radius: 5px 5px;
        background-color: rgb(255, 118, 118);
        width: 50px;
        height: 32px
    }

    .footer-wrap {
        min-height: 50px;
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        width: 100%;
        background-color: rgb(250,236,236);
    }
</style>

