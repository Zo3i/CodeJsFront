<template>
    <div>
      <div class="question">
        <el-row type="flex" justify="center">
         <el-col :xs="12" :sm="16" :md="14" :lg="12" :xl="10">
           <div class="question-simple">
            <div class="question-simple-q">
              <p>Q :)</p>
              <div class="question-simple-name" v-text="randomQuestion.name"></div>
            </div>
            <hr style='border-top: 1px solid #3c3c3c; margin-bottom: 10px;'/>
            <div class="work-button">
              <button @click="go()" style="background-color:#3c7dba;width:80px;border-radius:6px;border-color:#3c7dba;color:#303133;font-size:20px">try</button>
              <button @click="skip()" style="background-color:rgba(0,0,0,0.2);width:80px;border-radius:6px;border-color:#3c7dba;color:#4467ab;font-size:20px">skip</button>
            </div>
           </div>
          </el-col>
          <el-col :xs="10" :sm="8" :md="8" :lg="6" :xl="5">
            <div class="question-des">
              <div class="question-des-body">
                <p>M :)</p>
                <div class="question-des-main" v-text="randomQuestion.description"></div>
              </div> 
              <hr style='border-top: 1px solid #262729;margin-bottom: 10px;'/>
              <div class="tip">
                <p>TIP: 本题<span v-text="randomQuestion.score"></span>分</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <div class="team"> 
          <el-row type="flex" justify="center">
            <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">
              <div v-if="haveTeam" class="team-main" >
                <div v-for="(item, index) in teamall" :key="item.id" class="team-member">
                  <el-row type="flex" justify="end">
                    <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">排名</el-col>
                    <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">成员</el-col>
                    <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">分数</el-col>
                  </el-row>
                  <hr style='border-top: 1px solid #3c3c3c; margin-bottom: 10px;'/>
                  <MemberItem class="team-member-info" :teamMember="item" :index="index + 1"></MemberItem>
                  <div style="text-align:center" id="add"><input  type="button" value="邀请成员" class="login" @click="addBtn()" /></div>
                </div>
              </div>
              <div v-else class="team-main" >
                <p class="team-msg">{{teamMsg}}</p>
                <input v-if="show" type="button" value="创建团队" class="login" @click="createTeamBtn()" />
                <div v-if="!show">
                    <el-row type="flex" justify="center" class="body">
                      <el-col :span=12>
                        <input style="color:black" type="text" name="teamName" class="teamName" id="teamName" placeholder="请输入团队名称"/> 
                      </el-col>  
                    </el-row>
                    <el-row type="flex" justify="space-around" class="body">
                      <el-col :span=24>
                        <input type="button" @click="createTeam()" name="login" class="login" value="创建"/> 
                      </el-col> 
                    </el-row>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script>
  import NProgress from 'NProgress'
  import * as types from '@/store/types'
  import MemberItem from '@/components/base/teamItem/member-item'
export default {
  name: "Index",
  data() {
    return {
      randomQuestion: {},
      user: {},
      teamInfo: {},
      haveTeam: false,
      show: true,
      teamMsg: '抱歉您还没有参加或创建团队!',
      teamall: [],
    };
  },
  methods: {
    skip() {
      this.$ajax({
      method: 'post',
      url: '/api/getRandomQuestion?mobile=' + this.user.mobile,
      }).then (res => {
        this.randomQuestion = res.data
        console.log(res.data)
      })
    },
    go() {
      this.$router.push('/work?id=' + this.randomQuestion.id)
    },
    createTeam() {
      var teamName = $('#teamName').val()
      this.$ajax({
        method: 'post',
        url: '/api/maketeam',
        data: {
          teamName: teamName,
          mobile: this.user.mobile,
        }
      }).then (res => {
          // floatMessage(res.data)
          // $(".trigger-info").click()
          location.reload()
      })
    },
    createTeamBtn() {
      this.show = false
      this.teamMsg = "开始小队之旅吧~"
    },
    addBtn() {
     this.$alert('邀请地址:http://localhost:8090/rxMgr/a/third/addmember', '标题名称', {
          confirmButtonText: '确定',
        });
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.user)

    //获取随机题目
    this.$ajax({
     method: 'post',
     url: '/api/getRandomQuestion',
    }).then (res => {
      this.randomQuestion = res.data
    })

    //获取用户信息
    this.$ajax({
     method: 'get',
     url: '/api/getUserInfo',
    }).then (res => {
     this.$store.commit(types.USER, res.data)
    })

    //查询队伍
    this.$ajax({
      method: 'get',
      url: '/api/teaminfo?mobile=' + this.user.mobile,
    }).then (res => {
     console.log(res)
     this.teamInfo = res.data
     if (res.data != undefined && res.data != '' && res.data != null) {
       this.haveTeam = true
       var teamid = res.data.id
       //获取队伍所有人
      this.$ajax({
        method: 'get',
        url: '/api/teamall?teamid=' + teamid,
        }).then (res => {
          console.log(res)
          this.teamall = res.data
        })
     }
    })
    
  },
  beforeCreate() {
  },
  created() {
    
  },
  components: {
    MemberItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  font: 14px "Lato","Helvetica Neue","Helvetica",sans-serif;
  min-height: 100%;
  background-color: #303133;
}
html {
    height: 100%;
}
.question {
  margin-top: 1%; 
}
.question-simple {
  padding: 20px;
  background-color: #262729;
  height: 300px;
  width: 100%;
  color: aliceblue;
  font-size: 30px;
}

.question-des {
  padding: 20px;
  font-size: 30px;
  background-color: #3c3c3c;
  height: 300px;
  width: 100%;
  color:antiquewhite;
}

.question-simple-q {
  height: 50%;
  width: 100%;
}
.question-des-body {
  height: 50%;
  width: 100%;
}
.question-simple-name {
  text-align: center;
  width: 100%;
  height: 80%;
  font-size: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 30px; 
}

.question-des-main {
  text-align: center;
  width: 100%;
  height: 80%;
  font-size: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 30px; 
}
.work-button{
  margin-top: 30px;
  text-align: center;
}
.tip {
   margin-top: 26px;
   color:#75757f
}
.el-row {
  margin-bottom: 15px;
}
.team {
  height: 300px;
}
.team-main {
  width: 100%;
  background-color: #262729;
  color: white;
  font-size: 25px;
  text-align: center;
  padding: 10px;
}
.team-member {
  text-align: left;
  padding: 10px;
}
.team-member-info {
  color: #90bab5;
}
</style>
