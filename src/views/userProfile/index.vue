<template>
  <div class="main">
    <div class="main_body">
      <div style="font-size: 72px;margin-bottom: 32px;">User Profile</div>
      <div style="margin-bottom: 32px;">What's Your Name?</div>
      <el-input style="margin-bottom: 32px;" v-model="states.nickName"></el-input>
      <div style="margin-bottom: 32px;">What's Your Favorite Picture?</div>
      <el-upload
        class="avatar-uploader"
        action="http://101.132.183.137/api/v1/system/upload/"
        :headers="states.headers"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
      <div style="border: 2px solid; width: 178px;align-self: center;border-radius: 48px;margin-top: 64px;cursor: pointer;height: 80px;line-height: 70px;" @click="submitUserProfile()">Next</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive,onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {updateUserProfile,getUserProfile} from '@/api/user'
const router = useRouter();

const states = reactive({
    imageUrl:null,
    nickName:null,
    token:''
});

const imageUrl = ref('')

const handleAvatarSuccess= (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  states.imageUrl = response.data.url
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const submitUserProfile = ()=>{
  let data ={
    nickname:states.nickName,
    avatar:states.imageUrl,
    phone:'1',
    theme:'1'
  }
  updateUserProfile(data).then(res=>{
    getUserProfile().then(resp=>{
      console.log(resp);
    })
  })
}

onMounted(()=>{
   states.headers = {Authorization:'Bearer ' + localStorage.getItem('token')}
  })
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  .main_body {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: #fff;
    font-size: 48px;
    div {
      font-weight: bold;
    }
  }
}



.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  border: 2px solid;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #fff;
  width: 178px;
  height: 178px;
  text-align: center;
  border: 2px dashed;
}
</style>
