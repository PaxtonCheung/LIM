<template>
  <div class="main">
    <div class="title">Hello!{{states.userProfile.nickname}}!</div>
    <div class="title">Welcome To Partner Space!</div>
    <div class="subTitle" @click="goCategoryPage">Enter~</div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();

const states = reactive({
  userProfile:{}
});

const goCategoryPage = () => {
  router.push("/category");
};
onMounted(() => {
  states.userProfile = JSON.parse(localStorage.getItem('userProfile'))
});
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    color: #fff;
    font-size: 64px;
    font-weight: bold;
  }
  .subTitle {
    color: #fff;
    font-weight: bold;
    font-size: 48px;
    cursor: pointer;
  }
}
</style>
