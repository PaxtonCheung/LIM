<template>
  <div class="userInfo">
    <el-dropdown>
      <span class="el-dropdown-link" style="color: #fff; font-weight: bold; font-size: 24px">
        Setting
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>User Profile</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <div class="back" @click="goHome">Back</div>
  <div class="main">
    <div class="main_body">
      <el-image v-for="(item,index) in states.list" :key="item.id"
      style="width: 100px; height: 100px"
      :src="item.photo"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      :preview-src-list="states.srcList"
      :initial-index="index"
      fit="cover"
    />
    </div>
    <div class="btn_footer">
        <div style="cursor: pointer" @click="goPrevItem()">
          <el-icon><ArrowLeft /></el-icon>
        </div>
        <el-upload
        class="avatar-uploader"
        action="http://101.132.183.137/api/v1/system/upload/"
        :headers="states.headers"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
    <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
        <div style="cursor: pointer" @click="goNextItem()">
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref, reactive,onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {postGalleryApi,getGalleryListApi} from '@/api/gallery/index'
const router = useRouter();

const states = reactive({
  imageUrl:'',
  headers:'',
  offset:0,
  limit:27,
  list:[],
  srcList:[]
});

const goTabs = (path)=>{
  router.push("/"+path);
}

const goHome = () => {
  router.push("/home");
};

const handleAvatarSuccess= (
  response,
  uploadFile
) => {
  states.imageUrl = response.data.url
  postGalleryApi({photo:states.imageUrl}).then(()=>{
    getGalleryList()
  })
}

const getGalleryList = ()=>{
  let parmas = {
    limit:states.limit,
    offset:states.offset,
  }
  getGalleryListApi(parmas).then(res=>{
    states.list = res.list
    states.list.forEach(i=>{
      states.srcList.push(i.photo)
    })
  })
}


onMounted(()=>{
   states.headers = {Authorization:'Bearer ' + localStorage.getItem('token')}
   getGalleryList()
  })
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  .main_body {
    display: grid;
    grid-template-columns: repeat(9, 1fr); /* 创建三列，每列等宽 */
    grid-gap: 72px; /* 设置列与列之间的间隔 */
    text-align: center;
    color: #fff;
    font-size: 48px;
    cursor: pointer;
    div {
      font-weight: bold;
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
.btn_footer {
      margin-top: 32px;
      display: flex;
      justify-content: space-between;
      font-size: 32px;
      color: #fff;
    }
</style>
