<template>
  <div>
    <el-row type="flex" justify="end">
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">#{{index}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">{{teamMember.jsUser.name}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">{{teamMember.jsUser.rank}}</el-col>
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
           
        };
    },
    methods: {

    },
    mounted() {
        console.log(this.teamMember)
        console.log(this.teamMember.jsUser)
        console.log(this.index)
    },

}
</script>
<style>

</style>
