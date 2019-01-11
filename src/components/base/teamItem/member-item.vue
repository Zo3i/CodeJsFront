<template>
  <div>
    <el-row type="flex" justify="end" :class="'member' + index" >
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">#{{index}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">{{teamMember.jsUser.name}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">{{teamMember.jsUser.rank}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15" ><img @click="zone()" :src='zoneImg' width="50px" /></el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
    props: {
        teamMember: {
         type: Object,
        },
        index: {
            type: Number
        }
    },
     data () {
        return {
           zoneImg: '../static/image/zone/' + Math.floor(Math.random() * 58 + 1) + '.png'
        };
    },
    methods: {
        zone() {
            console.log(this.teamMember.jsUser.zoneId)
            this.$router.push('/user/zone?zoneId=' + this.teamMember.jsUser.zoneId)
        }
    },
    mounted() {
        if (this.teamMember.jsUser.mobile == JSON.parse(localStorage.user).mobile) {
           $('.member' + this.index).css('color', '#4bd5c4')
        }
    },

}
</script>
<style>

</style>
