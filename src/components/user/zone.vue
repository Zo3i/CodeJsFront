<template :key="key">
    <div>
        <div class="image"></div>
        <div class="main">
            <div class="title">留下你的脚印吧</div>
            <div class="leave-comment">
                <form id="comment-form">
                    <input type="text" placeholder="说点什么吧..." id="comment" name="comment"/>
                    <input type="hidden" id = "touser" name="touser" >
                    <input type="button" value="提交" @click="submit()" />
                </form>
            </div>
            <div class="comment">
               <div class="comment-item">
                   <img :src="face"  width='50px' height='50px' /> 
                   <span>admin:</span><span>xxxxxx</span>
                   <span value="this user mobile"><a type="button" value="" >回复</a></span>
               </div>
               <hr/>
               <div class="comment-item">
                   <img :src="face"  width='50px' height='50px' /> 
                   <span>admin 对 xxx 说:</span><span>xxxxxx</span>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
  import NProgress from 'NProgress'
  import * as types from '@/store/types'
export default {
  name: "Index",
  data() {
    return {
        face : '../static/image/face/1.png',
        user: {},
        zoneId: '',
    };
  },
  methods: {
      submit () {
            // console.log($('#comment-form').serializeArray());
            
            
            var comment = $('#comment').val()
            var touser = $('#touser').val()
            this.$ajax({
                method: "post",
                url: "/api/leaveComment",
                data: {
                   comment: comment,
                   zone: this.zoneId,
                   toUserId: touser,
                   fromMobile: this.user.mobile
                }
            }).then(res => {
                console.log(res)
            });

      }
  },
  mounted() {
      //获取用户信息
      this.$ajax({
        method: "get",
        url: "/api/getUserInfo"
      }).then(res => {
        this.user = res.data;
      });
      this.zoneId = this.$route.query.zoneId

console.log("获取留言")
      this.$ajax({
        method: "get",
        url: "/api/getComment?zoneId=" + this.zoneId
      }).then(res => {
        console.log(res)
      });

  },
  beforeCreate() {
  },
  created() {
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@font-face{
    font-family: 'Oxygen Mono';
    src : url('../../../static/font/OxygenMono-Regular.ttf');
}
body {
  font: 14px "Lato","Helvetica Neue","Helvetica",sans-serif;
  min-height: 100%;
  background-color: #303133;
}
html {
    height: 100%;
}

.image {
  background-image: url("https://source.unsplash.com/random");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  transform: scale(1.0001);
  width: 100%;
  min-height: calc(100vh - 160px);
}

.main {
    margin-top: 40px;
    width: 100%;
    /* height: 800px; */
    background-color: cadetblue;
}
.title {
    font-size: 30px;
    text-align: center;
}
.comment-item {
    height: 80px;
    background-color: bisque;
    padding: 10px;
    font-size: 20px;
}

</style>
