<template>
    <div>
        <div class="head">
            {{from.nickname}}
        </div>
        <div class="msg-outter"　:style="{height: screenHeight + 'px'}">  
            <div class="msg-wrap">
                <div v-for="(msg, idx) in list" :key="idx">
                    <p class="create_at" v-if="shouldShow(
                        msg.create_at,
                        idx === list.length-1 ? null : list[idx+1].create_at
                    )">
                        {{transfromTime(msg.create_at)}}
                    </p>
                    <div  class="msg-container" 
                    :style="{justifyContent: msg.myself ? 'flex-end': 'flex-start'}">
                        <img :src="from.headimgurl" class="avatar" v-if="!msg.myself">
                        <p :class="{ 
                            'left-content': !msg.myself,
                            'right-content': msg.myself
                        }">{{msg.content}}</p>
                    </div>
                </div>
                
            </div>
            <div class="bottom-hash" ref="bottomHash"></div>
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
import chat_utils from '@/utils/chat';

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
        let id = this.chatSelected.from._id;
        let ns = "chat-msgs-";
        let chats = new LsArray(ns+id);

        this.toEnd();
        this.list = chats.toArray();
        chats_global = chats; 
        console.log(chats.toArray());
        ws.bus.$on('onMsg',(newMsg) => {
            if(newMsg.from._id === id) {
                this.list.unshift(newMsg);
                this.toEnd();
            }
        })
        
    },
    methods: {
        send() {
            let msg = {
                content: this.message,
                her_id: this.from._id
            }
            console.log("Message:",this.message);
            if(this.message === "" || /^\s+$/gi.test(this.message)) {
                this.message = "";
                this.sendToast("不能发送空白消息");
            }
            else {
                ws.socket.emit('sendMsg',msg);
                msg.create_at = Date.now();
                msg.myself = true;
                this.list.unshift(msg);
                chat_utils.onMsg({
                    type: 'chat',
                    content: this.message,
                    from: this.from,
                    myself: true,
                    create_at: Date.now(),
                    unread: false,
                })
                this.message = "";
                this.toEnd();
            }
            
            

        },
        sendToast(msg){
			this.$popup.toast({
				msg: msg,
				align: true, 
				position: 'bottom'
			})
		},
        toEnd() {    
            setTimeout(()=>{
                console.log(this.$refs.bottomHash);
                this.$refs.bottomHash.scrollIntoView();
            })
        },
        transfromTime(ts) {
            var date = new Date(ts);
            return date.toLocaleTimeString();
        },
        shouldShow(now, pre) {
            if (!pre) return true; 
            let cha = Math.abs(now - pre);
            return cha > 180000;
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
        padding-top: 70px;
        padding-bottom: 55px;
        box-sizing: border-box;
    }

    .create_at {
        color: #cfcfcf;
        text-align: center;
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
        padding-right: 10px;
        margin-bottom: 50px;
    }

    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50% 50%;
    }

    .left-content {
        max-width: 80%;
        margin: 5px 10px 10px 10px;
        padding: 12px;
        font-size: 16px;
        color: #555;
        background-color: rgb(253,253,253);
        border-radius: 24px 24px 24px 3px;
        box-shadow: 4px 4px 7px 0px rgb(255,200,200);
        word-wrap: break-word;
    }
    
    .bottom-hash {
        height: 1px;
        width: 1px;
    }

    .right-content {
        max-width: 80%;
        margin: 5px 5px 10px 10px;
        padding: 12px;
        padding-left:15px;
        font-size: 16px;
        color: #555;
        background-color: rgb(253,253,253);
        border-radius: 24px 24px 3px 24px;
        box-shadow: 4px 4px 7px 0px rgb(255,200,200);
        word-wrap: break-word;
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
        z-index: 500;
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        width: 100%;
        background-color: rgb(250,236,236);
    }
</style>

