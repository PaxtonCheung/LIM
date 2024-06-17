<template>
  <div class="userInfo">
    <el-dropdown>
      <span
        class="el-dropdown-link"
        style="color: #fff; font-weight: bold; font-size: 24px"
      >
        Setting
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>User Profile</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <div class="back" @click="goCategory">Back</div>
  <div class="main">
    <div class="main_body">
      <div style="margin-bottom: 32px">Big Day</div>
      <div class="container">
        <div class="container_header">
          {{ states.bigDayItem.created_at }}
        </div>
        <div class="container_title">
          <div style="font-size: 32px;">{{ states.bigDayItem.title }}</div>
        </div>
        <el-divider />
        <div style="font-size: 24px;align-self: end;margin-right: 16px;color: red; cursor: pointer;" v-if="states.bigDayItem.user_nickname == states.userProfile.nickname" @click="deleteBigDay(states.bigDayItem.id)">×</div>
        <div style="height: 660px;width: 720px;word-wrap: break-word;overflow-y: auto;padding: 32px;font-size: 24px;white-space: pre-wrap;text-align: start;">{{ states.bigDayItem.content }}</div>
        <div class="container_footer">{{states.bigDayItem.user_nickname}}</div>
      </div>
      <div class="btn_footer">
        <div style="cursor: pointer" @click="goPrevItem()">
          <el-icon><ArrowLeft /></el-icon>
        </div>
        <div style="cursor: pointer;" @click="goSelectWeather()">
          <el-icon><Plus /></el-icon>
        </div>
        <div style="cursor: pointer" @click="goNextItem()">
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import{getBigDayApi,deleteBigDayApi} from '@/api/bigDay/index'
import { ElMessage,ElMessageBox } from 'element-plus'
import dayjs from 'dayjs';



const router = useRouter();

const states = reactive({
  title: "",
  content: "",
  offset:0,
  limit:1,
  bigDayItem:{},
  count:null,
  userProfile:{}
});

const goCategory = () => {
  router.push("/category");
};

const goSelectWeather = () => {
  router.push("/selectWeather");
};

const goPrevItem = ()=>{
  if(states.offset == 0){
    ElMessageBox.alert("It's already the first page", 'Tips', {
    confirmButtonText: 'OK',
  })
  }else{
    states.offset -= 1
    getBigDay()
  }
}

const goNextItem = ()=>{
  if(states.offset == states.count - 1){
    ElMessageBox.alert("It's already the last page", 'Tips', {
    confirmButtonText: 'OK',
  })
  }else{
    states.offset += 1
    getBigDay()
  }
}

const getBigDay = ()=>{
  let parmas = {
    limit:states.limit,
    offset:states.offset,
    is_self:1
  }
  getBigDayApi(parmas).then(res=>{
    states.bigDayItem = res.list[0]
    states.bigDayItem.created_at = dayjs(states.bigDayItem.created_at).format('YYYY-MM-DD')
    states.count = res.count
  })
}

const deleteBigDay = (id)=>{
  ElMessageBox.confirm(
    'proxy will permanently delete the bigday. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      deleteBigDayApi({id}).then(()=>{
        getBigDay()
      })
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
  
}

onMounted(() => {
  states.userProfile = JSON.parse(localStorage.getItem("userProfile"));
  getBigDay()
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  .main_body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: #fff;
    font-size: 48px;
    div {
      font-weight: bold;
    }
    .container {
      width: 720px;
      height: 900px;
      border: 2px solid;
      border-radius: 56px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .container_header{
        align-self: start;
        font-size: 16px;
        margin: 16px 0 0 32px;
      }
      .container_footer {
        font-size: 24px;
        align-self: end;
        margin: 32px 32px 0 0;
        cursor: pointer;
      }
    }
    .btn_footer {
      margin-top: 32px;
      display: flex;
      justify-content: space-between;
      font-size: 32px;
    }
  }
}
.userInfo {
  position: absolute;
  top: 10px; /* 距离顶部的距离 */
  right: 100px;
  color: #fff;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
}
.back {
  position: absolute;
  top: 10px; /* 距离顶部的距离 */
  left: 100px;
  color: #fff;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.el-textarea {
  width: 80%;
}

::-webkit-scrollbar {
  width: 6px; /* 垂直滚动条的宽度 */
  height: 6px; /* 水平滚动条的宽度 */
  background-color: #F5F5F5; /* 滚动条的背景颜色 */
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background-color: #808080; /* 滑块的背景颜色 */
  border-radius: 4px; /* 滑块的圆角 */
}
</style>
