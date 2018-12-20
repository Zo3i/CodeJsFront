<template>
  <div class="myquestion">
    <el-row type="flex" justify="end" >
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15" class="myquestion-name">{{question.name}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15" class="myquestion-rank">{{question.rank}}</el-col>
        <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15" class="myquestion-time">{{question.createTime}}</el-col>
    </el-row>
    <hr style='border-top: 1px solid #3c3c3c;margin-top:10px;margin-bottom: 25px;'/>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
    props: {
        question: {
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
    },

}
</script>
<style>
.myquestion {
    font-size: 20px;
    color: #cacaca;
}
.myquestion-name, .myquestion-time {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

</style>
