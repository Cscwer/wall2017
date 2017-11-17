<template>
    <div>
        <p @click="select(1)">男</p>
        <p @click="select(2)">女</p>
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
</style>