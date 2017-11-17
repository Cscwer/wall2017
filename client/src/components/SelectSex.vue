<template>
    <div class="select-sex">
        <h1 class="title">请选择您的性别</h1>
        <div @click="select(1)" class="container">
            <img src="../assets/select-sex/gender-boy.svg">
        </div>
        <div @click="select(2)" class="container">
            <img src="../assets/select-sex/gender-girl.svg">
        </div>
    </div>
</template>

<script>

export default {
	name: 'select-sex', 
	data(){
		return {}
	},
	created(){
        console.log('this select');
    },
    methods: {
        select(sex) {
            this.$emit('finish', sex);
        }
    }

}
</script>

<style scoped>
    .title{
        margin-bottom: .5em;
        text-align: center;
        font-size: 17px;
        color: #888;
    }
    .select-sex {
        font-size: 0;
    }
    .container {
        display: inline-block;
        width: 50%;
        text-align: center;
    }
    .container img {
        display: inline-block;
        padding: 0 10%;
        width: 80%;
    }
</style>