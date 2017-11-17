<template>
    <div>
        <div class="head">
            {{title}}
        </div>
        <ul class="list-wrap">
            <!-- 离线http留言板 -->
            <li class="chat" @click="openBoard">
                <img src="../assets/msg/message.png" class="avatar">
                <div class="text-wrap">
                    <p class="nickname">留言信息</p>
                    <p class="content">留言板</p>
                </div>

                <p class="time">
                    {{ transfromTime(Date.now()) }}
                </p>
            </li>

            <li class="chat wish" v-if="!hasWishMsg"  @click="openWish">
                <img src="../assets/msg/wish.png" class="avatar">

                <div class="text-wrap">
                    <p class="nickname">愿望动态</p>
                    <p class="content">点击查看愿望动态</p >
                </div>

                <p class="time">
                    {{ transfromTime(Date.now()) }}
                </p>
            </li>

            <div v-for="(chat, idx) in list" :key="idx">
                <li class="chat" @click="toChat(idx,chat)" v-if="chat.type === 'chat'">
                    <img :src="chat.from.headimgurl" class="avatar">
                    <div class="text-wrap">
                        <p class="nickname">{{chat.from.nickname}}</p>
                        <p class="content">{{chat.content}}</p >
                    </div>

                    <p class="time">
                        {{ transfromTime(chat.create_at) }}
                    </p>
                    <span class="red-dot" v-if="chat.unread"></span>
                </li> 

                <li class="chat wish" v-if="chat.type[0] === 'w'" @click="toWish(chat, idx)">
                    <img src="../assets/msg/wish.png" class="avatar">

                    <div class="text-wrap">
                        <p class="nickname">愿望动态</p>
                        <p class="content">{{chat.msg}}</p >
                    </div>

                    <p class="time">
                        {{ transfromTime(chat.create_at) }}
                    </p>
                    <span class="red-dot" v-if="chat.unread"></span>
                </li>
            </div>
        </ul>
    </div>
</template>
<script>
import chat from '@/utils/chat';
import Chat_Component from './Chat';
import WishMsgList from './WishMsgList'; 
import Board from './Board'; 

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
        console.log('[ Msg.vue Init ]', this.list);
    },
    computed: {
        hasWishMsg(){
            return this.list.some(e => {
                return e.type[0] === 'w'; 
            });
        }
    },
    methods: {
        loadList(){
            var list = chat.list.toArray(); 

            // var hasGwSysIoChat = list.some(e => {
            //     return (e.type === 'chat' && e.from._id === 'The_Gw_Sys_Io');
            // })

            this.list = list; 
        },
        transfromTime(ts) {
            var date = new Date(ts);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            if(minutes % 10 == minutes){
                minutes = '0' + minutes;
            }
            else {
                minutes = minutes;
            }
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
                component: WishMsgList,
                bg: 'rgb(255, 241, 241)'
            });

            wishTop.launch();
        },
        openWish(){
            this.$popup.push({
                type: 'modal',
                component: WishMsgList,
                bg: 'rgb(255, 241, 241)'
            }).launch();
        },
        openBoard(){
            this.$popup.push({
                type: 'modal',
                component: Board,
                bg: 'rgb(255, 241, 241)'
            }).launch(); 
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
        width: 100%;
        font-size: 90%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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
        bottom: 20px;
        right: 1px;
		width: 6px;
		height: 6px;
        border-radius: 50% 50%;
		background-color: #ff0000;
    }
</style>

