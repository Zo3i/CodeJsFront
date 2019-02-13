<template>
  <div>
    <el-row type="flex" justify="end" :class="'question-item' + index" >
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15" ><span :class="'color' + index">◈</span>{{index}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">{{questionItem.name}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">{{questionItem.score}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">{{questionItem.count}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15"   ><span @click.prevent="go()"><a href="#" class="login" >挑战</a></span></el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
    props: {
        questionItem: {
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
        go () {
            this.$router.push("/work?id=" + this.questionItem.id);
        }
    },
    mounted() {

    },

}
</script>
<style>

</style>
