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
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="back" @click="goCategory">Back</div>
    <div class="main">
      <div class="main_body">
        <div style="margin-bottom: 32px;">Big Day</div>
        <div class="container">
          <div class="container_header">
            <div>{{ states.time }}</div>
          </div>
          <div class="container_title">
            <el-input  v-model="states.title" ></el-input>
          </div>
          <el-divider />
          <el-input
            v-model="states.content"
            :autosize="{ minRows: 2, maxRows: 31 }"
            type="textarea"
            placeholder="Please input"
            maxlength="800"
            show-word-limit
          />
          <div class="container_footer" @click="submitBigDay()">
            {{ states.userProfile.nickname }}
          </div>
        </div>
        <div class="btn_footer">
          <div style="cursor: pointer;">
            <el-icon><ArrowLeft /></el-icon>
          </div>
          <div style="cursor: pointer;" @click="goSelectWeather">
            <el-icon><Plus /></el-icon>
          </div>
          <div style="cursor: pointer;">
            <el-icon><ArrowRight /></el-icon>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive,onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import{createBigDayApi} from '@/api/bigDay/index'
  import dayjs from 'dayjs';

  const router = useRouter();
  
  const states = reactive({
    title:'',
    content:'',
    userProfile:{}
  });
  
  const goCategory = () =>{
    router.push("/category");
  }
  
  const goSelectWeather = () =>{
    router.push("/selectWeather");
  }

  const submitBigDay = ()=>{
    let data = {
      weather:'1',
      mood:'1',
      content:states.content,
      own:1,
      title:states.title
    }
    createBigDayApi(data)
  }
  
  onMounted(()=>{
    states.userProfile = JSON.parse(localStorage.getItem('userProfile'))
  })
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
      .container{
        width: 720px;
        height: 900px;
        border: 2px solid;
        border-radius: 56px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .container_footer{
          font-size: 24px;  
          align-self: end;     
          margin: 32px 32px 0 0;
          cursor: pointer;
        }
      }
      .btn_footer{
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
  
  .el-textarea{
    width: 80%;
  }
  </style>
  