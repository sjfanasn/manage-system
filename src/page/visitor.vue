<template>
    <div>
        <visitor-pie :data="data"></visitor-pie>
    </div>
</template>

<script>
import visitorPie from "../components/visitorPie";
import {getUserCity} from "../service/getData.js";
    export default {
        data(){
            return {
                data:{
                    beijing:0,
                    shanghai:0,
                    shenzhen:0,
                    hangzhou:0,
                    qita:0
                }
            }
        },
        components:{
            visitorPie
        },
        mounted(){
            this.initData();
        },
        methods:{
            async initData(){
                const res =await getUserCity();
                if(res.data.status === 1){
                    this.data = res.data.user_city;
                }
            }
        }
    }
</script>

<style scoped>

</style>