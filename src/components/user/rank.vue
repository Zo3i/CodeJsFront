<template :key="key">
    <div>
        <div class="banner">大佬排行榜</div>
        <hr style="border-top: 1px solid #221f1f; margin-bottom: 30px;">
            <el-row type="flex" justify="center">
                <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="18">
                    <div class="rank">
                        <div class="rank-main">
                            <el-row type="flex" justify="space-between">
                            <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">排名</el-col>
                            <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">队名</el-col>
                            <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">人数</el-col>
                            <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">状元</el-col>
                            <el-col :xs="22" :sm="24" :md="22" :lg="18" :xl="15">总分</el-col>
                            </el-row>
                            <div v-for="(item, index) in teamAll" :key="item.id" class="rank-item">
                                <hr v-if="index < (page * 5)" style="border-top: 1px solid #221f1f; margin-bottom: 20px;margin-top: 5px;">
                                <RankItem class="rank-item-info" :rankItem="item" v-if="index < (page * 5)" :index="index + 1"></RankItem>
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
</template>

<script>
  import NProgress from 'NProgress'
  import RankItem from '@/components/base/rankItem/rank-item'
export default {
  name: "Index",
  data() {
    return {
        teamAll: [],
        page: 1,
        totle: '',
        isScroll: true
    };
  },
  methods: {
    load() {
      this.page ++
       this.$nextTick(() => {
         if (this.totle > 5 && this.totle > (this.page * 5)) {
            this.isScroll = true
         }
      })
    },
    handleScroll (){
      var that = this
      $('.el-main').scroll(function () {
        var st = this.scrollTop;
        var height = this.clientHeight;
        var sh = this.scrollHeight;
              if (st + height >= sh && that.isScroll == true){
                  that.isScroll = false
                  st -= 1000
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
    this.$ajax({
        method: 'get',
        url: '/api/rank',
    }).then (res => {
        var team = res.data //.concat(res.data).concat(res.data).concat(res.data).concat(res.data).concat(res.data).concat(res.data)
        this.totle = team.length
        this.teamAll = team
    })
  },
  components: {
      RankItem
  },
};
</script>



<style >
.banner {
    font-size: 40px;
    color: #aaaaa9;
    text-align: center;
    padding: 20px;
}
.rank {
    background-color: #262729;
    padding: 10px;
}
.rank-main {
    color: #aaaaa9;
    font-size: 30px;
    text-align: center;
}
.rank-item {
    color: #aaaaa9;
    font-size: 30px;
    text-align: center;
}
.rank-item-info {
    color: #90bab5;
}
.el-col {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
