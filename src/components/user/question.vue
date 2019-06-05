<template>
  <div>
    <div class="get-question">
      <div class="search">
        题目名字: <input type="text" id="name" style="height:37px;"> &nbsp; 
        难度: <select id="rank">
              <option value ="" disabled selected>请选择</option>
              <option value ="1">简单</option>
              <option value ="2">一般</option>
              <option value="3">困难</option>
              <option value="4">地狱</option>
             </select>
         &nbsp; &nbsp; &nbsp; <span @click.prevent="find()"><a href="#" class="question-btn" >查询</a></span>
      </div>
      <div v-if="totle > 0"  class="question-list">
        <el-row type="flex" justify="center">
                <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="18">
                    <div class="question-list-info">
                        <div class="question-list-main">
                            <el-row type="flex" justify="space-between">
                            <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">序号</el-col>
                            <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">题目</el-col>
                            <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">分数</el-col>
                            <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">完成人数</el-col>
                            <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">是否完成</el-col>
                            <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">挑战</el-col>
                            </el-row>
                            <div v-for="(item, index) in questionItem" :key="item.id" class="rank-item">
                                <hr v-if="index < (page * 5)" style="border-top: 1px solid #221f1f; margin-bottom: 20px;margin-top: 5px;">
                                <QuestionItem class="question-item-info" :questionItem="item" v-if="index < (page * 5)" :index="index + 1"></QuestionItem>
                            </div>
                            <div v-if="totle > 5 && totle > (page * 5)">
                                <div  style=" text-align:center">
                                    <button id="load" @click="load" style="background-color:rgba(0,0,0,0.2);width:120px;border-radius:6px;border-color:#3c7dba;color:#84a3cc;font-size:20px">
                                    加载更多
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </el-col>
                </el-row>
      </div>
      <div v-else class="warm">
        没题目咯;
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from "NProgress";
import QuestionItem from '@/components/base/questionItem/question-item';
export default {
  name: "Index",
  data() {
    return {
     user: {},
     questionItem: [],
     totle: '',
     page: 1
    };
  },
  methods: {
   find () {
     var rank = $('#rank').val()
     var lowRank = ''
     var highRank = ''
     switch (rank) {
       case "1" : 
        lowRank = 1
        highRank = 4
        break;
      case "2" : 
        lowRank = 5
        highRank = 10
        break;
      case "3" : 
        lowRank = 11 
        highRank = 20
        break;
      case "4" : 
        lowRank = 20 
        highRank = 50
        break; 
      default:
        lowRank = 0 
        highRank = 100
     }
    this.$ajax({
      url: "/api/orderByArgs",
      method: "post",
      data: {
        lowRank: lowRank,
        highRank: highRank,
        mobile: this.$route.query.mobile,
        name: $('#name').val(),
        score: 1
      }
    }).then(res => {
      this.questionItem = res.data
      this.totle = res.data.length
    })
   },
  load() {
      this.page ++
       this.$nextTick(() => {
         if (this.totle > 5 && this.totle > (this.page * 5)) {
            this.isScroll = true
         }
      })
    },
  },
  mounted() {
    new Promise(resolve => {
      //获取用户信息
      this.$ajax({
        method: "get",
        url: "/api/getUserInfo"
      }).then(res => {
        this.user = res.data;
        resolve(res.data);
      });
    }).then(data => {
         this.$ajax({
      url: "/api/orderByArgs",
      method: "post",
      data: {
        lowRank: 0,
        highRank: 100,
        mobile: this.$route.query.mobile,
        name: '',
        score: 1
      }
    }).then(res => {
      console.table(res.data)
      this.questionItem = res.data
      this.totle = res.data.length
    })
    });
  },
  beforeCreate() {},
  created() {},
  components: {
    QuestionItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  font: 14px "Lato", "Helvetica Neue", "Helvetica", sans-serif;
  min-height: 100%;
  background-color: #303133;
}
html {
  height: 100%;
}
.get-question {
  color: #aaaaa9;
  font-size: 18px;
  text-align: center;
  padding: 10px;
}
.question-list {
  font-size: 30px;
  text-align: center;
  padding: 20px;
}
.el-col {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.question-list-info {
  background-color: #262729;
}
.question-list-main {
  padding: 18px;
}
.search {
  line-height: 100px;
  font-size: 30px;
  height: 100px;
}
.warm {
  padding: 20px;
  font-size: 50px;
}

.question-btn {
    text-align: center;
    background-color: #efefef;
    color: #000 !important;
    border: solid 1px black;
    border-width: 1px;
    padding: 5px;
    font-size: 25px;
    overflow: hidden;
    border-radius: 4px;
}

</style>
