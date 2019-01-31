<template>
  <div>
    <el-row type="flex" justify="end" :class="'member' + index" >
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15" ><span :class="'color' + index">◈</span>{{index}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">{{rankItem.name}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">{{rankItem.count}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">{{rankItem.best}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15" >{{rankItem.TotalRank}}</el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
    props: {
        rankItem: {
         type: Object,
        },
        index: {
            type: Number
        }
    },
     data () {
        return {
        };
    },
    methods: {

    },
    mounted() {
        var colorVar = this.index
        if (colorVar >= 21.5) {
            colorVar = 21.5
        }
        $('.member' + this.index).css('color', "rgb(" + (253 - colorVar * 10) + ", " + (254 - 10 * colorVar) + " ,"+ (255 - 10 * colorVar) +")")
        console.log($('.color' + this.index).css('color'))
    },

}
</script>
<style>

</style>
