<template>
    <div>
        <div class="head">
            {{title}}
        </div>
        <ul class="list-wrap">

            <div v-for="(chat, idx) in list" :key="idx">
                <li class="chat" @click="toChat(idx,chat)" v-if="chat.type === 'chat'">
                    <img :src="chat.from.headimgurl" class="avatar">
                    <div class="text-wrap">
                        <p class="nickname">{{chat.from.nickname}}</p>
                        <p class="content">{{chat.content}}</p >
                    </div>

                    <p class="time">
                        {{ transfromTime(chat.create_at) }}
                        <span class="red-dot" v-if="chat.unread"></span>
                    </p>
                </li> 

                <li class="chat wish" v-if="chat.type[0] === 'w'" @click="toWish(chat, idx)">
                    <img :src="chat.data.he.headimgurl" class="avatar">

                    <div class="text-wrap">
                        <p class="nickname">愿望动态</p>
                        <p class="content">{{chat.msg}}</p >
                    </div>

                    <p class="time">
                        {{ transfromTime(chat.create_at) }}
                        <span class="red-dot" v-if="chat.unread"></span>
                    </p>
                </li>
            </div>
            
        </ul>
    </div>
</template>
<script>
import chat from '@/utils/chat';
import Chat_Component from './Chat';
import WishMsgList from './WishMsgList'; 


export default {
    name: 'msg-list',
    data() {
        return {
            title: "消息",
            list: [],
        }
    },
    created() {
        this.loadList(); 
        console.log(this.list);
    },
    methods: {
        loadList(){
            this.list = chat.list.toArray(); 
        },
        transfromTime(ts) {
            var date = new Date(ts);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            return hours + ":" + minutes;
        },
        setRead(idx){
            return chat.list.findAndMap(idx, selected => {
                selected.unread = false;
                return selected;
            }); 
        },
        toChat(idx,chat_selected) {
            this.setRead(idx); 

            this.loadList();
            var chatCop = this.$popup.push({
                type: 'modal',
                component: Chat_Component,
                binding: {
                    chatSelected: chat_selected
                },
                event: {
                    sayHello: function(msg) {
                        console.log(msg);
                    }
                }
            })

            chatCop.launch();
        },
        toWish(chat, idx){
            this.setRead(idx); 
            this.loadList();

            var wishTop = this.$popup.push({
                type: 'modal',
                component: WishMsgList
            });

            wishTop.launch();
        }
    }
}
</script>
<style scoped>
    .list-wrap {
        position: relative;
        margin-top: 15px;
        padding: 10px;
    }

    .chat {
        position: relative;
        padding-bottom: 10px;
        margin-bottom: 8px;
    }

    .head {
        font-size: 16px;
        color: rgb(222, 150, 150);
        text-align: center;
        line-height: 50px;
        box-shadow: 0px 5px 15px 0px rgba(254, 150, 140, .25);
    }

    .avatar {
        position: absolute;
        left: 0;
        width: 50px;
        height: 50px;
        border-radius: 50% 50%;
        background-color: rgb(220, 220, 220);
    }

    .nickname {
        font-size: 110%;
        padding-bottom: 3px;
        color: #222;
    }

    .content {
        font-size: 90%;
        color: rgb(129, 129, 129);
    }

    .text-wrap {
        position: relative;
        font-size: 16px;
        line-height: 20px;
        padding: 5px 0px 5px 60px;
    }

    .time {
        position: absolute;
        right: 0;
        top: 0;
        line-height: 30px;
    }

    .red-dot {
        display: block;
        position: absolute;
        bottom: -7px;
        right: 42%;
		width: 6px;
		height: 6px;
        border-radius: 50% 50%;
		background-color: #ff0000;
    }
</style>

