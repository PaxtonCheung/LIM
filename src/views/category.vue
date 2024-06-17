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
      <div @click="goTabs('messageBoard')">Message Board</div>
      <div @click="goWating('inspirationArea')">Inspiration Area</div>
      <div @click="goWating('todoList')">Todo List</div>
      <div @click="goTabs('bigDay')">Big Day</div>
      <div @click="goTabs('gallery')">Gallery</div>
      <div @click="goWating('timeLine')">Time Line</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessageBox } from 'element-plus'

const router = useRouter();

const states = reactive({
  registerUsername: null,
  registerPassword: null,
  registerPasswordAgain: null,
  loginUsername: null,
  loginPassword: null,
});

const goTabs = (path)=>{
  router.push("/"+path);
}

const goWating = ()=>{
  ElMessageBox.alert("Please wait for a moment.", 'Tips', {
    confirmButtonText: 'OK',
  })
}

const goHome = () => {
  router.push("/home");
};
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
    grid-template-columns: repeat(3, 1fr); /* 创建三列，每列等宽 */
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
</style>
