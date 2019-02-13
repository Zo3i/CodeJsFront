<template>
  <div>
    <el-row type="flex" justify="end" :class="'member' + index" >
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15" ><span :class="'color' + index">◈</span>{{index}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">{{userRank.name}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">{{userRank.teamName}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">{{userRank.rank}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15"><img @click="zone()" :src='zoneImg' width="50px" style="cursor: pointer" /></el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
    props: {
        userRank: {
         type: Object,
        },
        index: {
            type: Number
        }
    },
     data () {
        return {
            zoneImg: '../static/image/zone/' + Math.floor(Math.random() * 58 + 1) + '.png',
        };
    },
    methods: {
    zone() {
        this.$router.push('/user/zone?zoneId=' + this.userRank.zoneId)
    }
    },
    mounted() {
        var colorVar = this.index
        if (colorVar >= 53.8) {
            colorVar = 53.8
        }
        $('.member' + this.index).css('color', "rgb(" + (253 - colorVar * 4) + ", " + (254 - 4 * colorVar) + " ,"+ (255 - 4 * colorVar) +")")
        console.log($('.color' + this.index).css('color'))
    },

}
</script>
<style>
</style>
