<template :key="key">
    <div >
      <div class="top-info"></div>
      <el-row type="flex" justify="end">
         <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="3"></el-col>

          <el-col class="top-info-card" :xs="6" :sm="6" :md="8" :lg="6" :xl="5">
            <p class="top-info-card-main">积分所有</p>
            <span>{{myinfo.totleRank}}</span>
            <p style="writing-mode: tb-rl; color:rgba(170,170,169,0.3)">秘籍</p>
          </el-col>
         
         <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"></el-col>

          <el-col class="top-info-card" :xs="6" :sm="6" :md="8" :lg="6" :xl="5">
            <p class="top-info-card-main">收到点赞</p>
            <span>{{myinfo.totleLike}}</span>
            <p style="writing-mode: tb-rl; color:rgba(170,170,169,0.3)">宝典</p>
          </el-col>

          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"></el-col>

          <el-col class="top-info-card" :xs="6" :sm="6" :md="8" :lg="6" :xl="5">
            <p class="top-info-card-main">被收藏数</p>  
            <span>{{myinfo.totleCollect}}</span>
            <p style="writing-mode: tb-rl; color:rgba(170,170,169,0.3)">快乐</p>
          </el-col>
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"></el-col>

          <el-col class="top-info-card" :xs="6" :sm="6" :md="8" :lg="6" :xl="5">
            <p class="top-info-card-main">所在战队</p>
            <span>{{myinfo.team}}</span>
            <p style="writing-mode: tb-rl; color:rgba(170,170,169,0.3)">收获</p>
          </el-col>

          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="3"></el-col>
        </el-row>
        <br/><br/>

        <div class="bottom-info">
          <el-tabs v-model="activeName" tab-position="right" style="height: 200px;" @tab-click="handleClick">
            <el-tab-pane label="解决问题" name="first" >
              <div  v-if="questionList.length > 0">
                <hzqing-vue-timeline 
                  timelineColor="#5bbcd5"  
                  timeContentColor="white"
                  :dataList="questionList"
                  ></hzqing-vue-timeline>
              </div>
               <div v-else>
                  <p class="emptyList" style="color: #aaaaa9;">空空如也</p>
                </div>
                 
            </el-tab-pane>
            <el-tab-pane label="我的答案" name="second" class="myanswer" :lazy='lazy' >
              <div class="answer">
                <div v-if="answerlist.length > 0">
                  <div  v-for="(item, index) in answerlist" v-bind:key="index * 3">
                    <answerItem v-if="index < (answerlistPage * 5)" :answer="item"  :key="item.id"></answerItem>
                  </div>
                </div>
                <div v-else>
                  <p class="emptyList">空空如也</p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="收藏答案" name="third" :lazy='lazy' >
              <div class="collectanswer">
                <div v-if="collectList.length > 0">
                  <div v-for="(item, index) in collectList" v-bind:key="index">
                    <answerItem :answer="item" :key="item.id"></answerItem>
                  </div>
                </div>
                <div v-else>
                  <p class="emptyList">空空如也</p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="点赞答案" name="fourth" class="myanswer" :lazy='lazy' >
              <div class="likeanswer">
                <div v-if="likeList.length > 0">
                  <div v-for="(item, index) in likeList" v-bind:key="index">
                    <answerItem :answer="item" :key="item.id"></answerItem>
                  </div>
                </div>
                <div v-else>
                  <p class="emptyList">空空如也</p>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
    </div>

</template>

<script>
  import NProgress from 'NProgress'
  import AnswerItem from '@/components/base/answerItem/answer-item'
  import UserQuestion from '@/components/base/userQuestion/user-question'
export default {
  name: "Index",
  data() {
    return {
      activeName: 'first',
      answerlist: [],
      likeList: [],
      collectList: [],
      questionList: [],
      lazy: true,
      myinfo: {},
      answerlistPage: 1,
      answerlistTotle: '',
      isScroll: true
    };
  },
  methods: {
    handleClick(tab, event) {
        this.activeName = tab.name
    },
    load() {
      this.answerlistPage ++
      console.log(this.answerlistTotle)
       this.$nextTick(() => {
         if (this.answerlistTotle > 5 && this.answerlistTotle > (this.answerlistPage * 5)) {
            this.isScroll = true
         }
      })
    },
    handleScroll (){
      var that = this
      $('.el-main').scroll(function () {
        console.log("滚动" + that.isScroll)
        
        var st = this.scrollTop;
        var height = this.clientHeight;
        var sh = this.scrollHeight;
              if (st + height >= sh && that.isScroll == true){
                  console.log("到底了..");
                  that.isScroll = false
                  st -= 300
                  that.load()
              }
        });
    }
  },
  mounted() {
     window.addEventListener('scroll', this.handleScroll, true);
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

      //用户赞的答案
      this.$ajax({
        method: "post",
        url: "/api/getLikeAnwser",
      }).then(res => {
          this.likeList = res.data
        }).catch(err => {})   


    //用户回答的答案
      this.$ajax({
        method: "post",
        url: "/api/getMyAnwser",
      }).then(res => {
          this.answerlist = res.data
          this.answerlistTotle = this.answerlist.length
        }).catch(err => {})


      this.$ajax({
        method: "post",
        url: "/api/getCollctAnwser",
      }).then(res => {
          this.collectList = res.data
        }).catch(err => {})        


     this.$ajax({
        method: "post",
        url: "/api/getAllQuestion",
      }).then(res => {
          // this.questionList = res.data
          var data = res.data
          data.forEach(e => {
            e.time = e.createTime
            e.title = e.name
            e.content = '获得' + e.rank + '分'
            e.img = '../static/image/zone/' + Math.floor(Math.random() * 58 + 1) + '.png'
          });
          console.log(data)
          this.questionList = data
        }).catch(err => {})    
   
    this.$ajax({
        method: "post",
        url: "/api/myInfo",
      }).then(res => {
          this.myinfo = res.data
        }).catch(err => {}) 

    })


  },
  components: {
    AnswerItem,
    UserQuestion,
  },
};
</script>



<style>
.top-info {
  height: 10px;
  background-color:#494646;
}
.top-info-card {
  height: 300px;
  background-color: rgba(0, 0, 0, 0.14);

-webkit-box-shadow: 5px 8px 26px -6px rgba(170,170,169,1);
-moz-box-shadow: 5px 8px 26px -6px rgba(170,170,169,1);
box-shadow: 5px 8px 26px -6px rgba(170,170,169,1);

font-size: 30px;
color: #aaaaa9;
text-align: center;
    display: inline;
}

.top-info-card-main {
    margin-top: 30%;
}

.bottom-info {
  background-color: #282828 !important;
  margin: 0 auto !important;
}
.el-tabs__item {
  color: darkgrey !important;
}
.el-tabs__item:hover {
    color: #75757f !important;
    cursor: pointer !important;
}
.el-tabs__item.is-active {
    color: #e7e7e7 !important;
}
.el-tabs__active-bar {
  background-color: #444 !important;
}
.el-tabs__nav-wrap::after {
  background-color: #aaaaa9 !important;
}
.el-tabs--left, .el-tabs--right{
  padding: 30px !important;
  overflow: auto !important;
  height: 100% !important
}
.myanswer {
  overflow:auto !important;
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
.myquestion-title {
  font-size: 30px;
  color: antiquewhite;
}
#hzqing {
  color: #e7e7e7;
  --timelineColor:#00000000 !important;
   --timeContentColor:#aaaaa9 !important;
}
.timeline-img {
  /* background-color: red; */
}
.timeline-img>div {
  background-color: #333333 !important;
  /* border-radius: 0 !important; */
}
.vue-avatar--wrapper {
  border-radius: 0 !important;
  /* width: 80px !important; */
  /* height: 80px !important; */
}
.emptyList {
  font-size: 50px;
  text-align: center;
  line-height: 220px;
}

</style>