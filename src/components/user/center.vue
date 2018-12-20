<template :key="key">
    <div >
      <div class="top-info"></div>
      <el-row type="flex" justify="end">
         <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="3"></el-col>

          <el-col class="top-info-card" :xs="6" :sm="6" :md="8" :lg="6" :xl="5">
            <p class="top-info-card-main">目前积分</p>
            <span>2</span>
            <p style="writing-mode: tb-rl; color:rgba(170,170,169,0.3)">秘籍</p>
          </el-col>
         
         <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"></el-col>

          <el-col class="top-info-card" :xs="6" :sm="6" :md="8" :lg="6" :xl="5">
            <p class="top-info-card-main">收到点赞</p>
            <span>2</span>
            <p style="writing-mode: tb-rl; color:rgba(170,170,169,0.3)">宝典</p>
          </el-col>


          <!-- <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="3"></el-col> -->
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"></el-col>

          <el-col class="top-info-card" :xs="6" :sm="6" :md="8" :lg="6" :xl="5">
            <p class="top-info-card-main">被收藏答案</p>  
            <span>2</span>
            <p style="writing-mode: tb-rl; color:rgba(170,170,169,0.3)">快乐</p>
          </el-col>
          <!-- <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="3"></el-col>
          <el-col class="top-info-card" :xs="6" :sm="6" :md="8" :lg="6" :xl="5">
            <p class="top-info-card-main">答案最佳</p>
            <span>2</span>
            <p style="writing-mode: tb-rl; color:rgba(170,170,169,0.3)">学习</p>
          </el-col> -->
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"></el-col>

          <el-col class="top-info-card" :xs="6" :sm="6" :md="8" :lg="6" :xl="5">
            <p class="top-info-card-main">所在战队</p>
            <span>2</span>
            <p style="writing-mode: tb-rl; color:rgba(170,170,169,0.3)">收获</p>
          </el-col>

          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="3"></el-col>
        </el-row>
        <br/><br/>

        <div class="bottom-info">
          <el-tabs v-model="activeName" tab-position="right" style="height: 200px;" @tab-click="handleClick">
            <el-tab-pane label="解决问题" name="first" >xxx</el-tab-pane>
            <el-tab-pane label="我的答案" name="second" class="myanswer" :lazy='lazy' >
              <div class="answer">
                <div v-for="(item, index) in answerlist" v-bind:key="index * 3">
                  <answerItem :answer="item" :key="item.id"></answerItem>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="收藏答案" name="third" :lazy='lazy' >
              <div class="collectanswer">
                <div v-for="(item, index) in collectList" v-bind:key="index">
                  <answerItem :answer="item" :key="item.id"></answerItem>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="点赞答案" name="fourth" class="myanswer" :lazy='lazy' >
              <div class="likeanswer">
                <div v-for="(item, index) in likeList" v-bind:key="index">
                  <answerItem :answer="item" :key="item.id"></answerItem>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>`
        </div>

    </div>
</template>

<script>
  import NProgress from 'NProgress'
  import AnswerItem from '@/components/base/answerItem/answer-item'
export default {
  name: "Index",
  data() {
    return {
      activeName: 'fourth',
      answerlist: [],
      likeList: [],
      collectList: [],
      lazy: true,
    };
  },
  methods: {
     handleClick(tab, event) {
        this.activeName = tab.name
    },
  },
  mounted() {

  },
  beforeCreate() {
  },
  created() {
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
        method: "post",
        url: "/api/getLikeAnwser?token=" + data.token,
      }).then(res => {
          this.likeList = res.data
        }).catch(err => {})   


      this.$ajax({
        method: "post",
        url: "/api/getMyAnwser?token=" + data.token,
      }).then(res => {
          this.answerlist = res.data
        }).catch(err => {})


      this.$ajax({
        method: "post",
        url: "/api/getCollctAnwser?token=" + data.token,
      }).then(res => {
          this.collectList = res.data
        }).catch(err => {})        

   



    })


  },
  components: {
    AnswerItem
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@font-face{
    font-family: 'Oxygen Mono';
    src : url('../../../static/font/OxygenMono-Regular.ttf');
}
.top-info {
  height: 10px;
  background-color:darkgrey;
}
.top-info-card {
  height: 300px;
  background-color: rgba(117,117,127,0.2);

-webkit-box-shadow: 5px 8px 26px -6px rgba(170,170,169,1);
-moz-box-shadow: 5px 8px 26px -6px rgba(170,170,169,1);
box-shadow: 5px 8px 26px -6px rgba(170,170,169,1);


font-size: 30px;
color: bisque;
text-align: center;
    display: inline;
}

.top-info-card-main {
    margin-top: 30%;
}

.bottom-info {
  background-color: #444;
  margin: 0 auto;
}
.el-tabs__item {
  color: darkgrey;
}
.el-tabs__item:hover {
    color: #75757f;
    cursor: pointer;
}
.el-tabs__item.is-active {
    color: #e7e7e7;
}
.el-tabs__active-bar {
  background-color: #444
}
.el-tabs__nav-wrap::after {
  background-color: #aaaaa9
}
.el-tabs--left, .el-tabs--right{
  padding: 30px;
  overflow: auto;
  height: 100% !important
}
.myanswer {
  overflow:auto;
}
.answer{
  color: #aaaaa9
}
.likeanswer {
  color: #aaaaa9
}
.collectanswer {
  color: #aaaaa9
}
</style>
