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
      <div>Time Line</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();

const states = reactive({
  registerUsername: null,
  registerPassword: null,
  registerPasswordAgain: null,
  loginUsername: null,
  loginPassword: null,
});

const goCategory = () =>{
  router.push("/category");
}
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
    div{
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
