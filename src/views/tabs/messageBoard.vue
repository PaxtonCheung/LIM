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
        <div style="width: 100%;font-size: 64px;">Message Board</div>
        <div class="main_body_right" style="width: 50vw;">
            
            <div class="content" v-for="item in states.messageBoardList" :key="item.id">
              <el-divider />
                <div class="content_header">
                    <img width="48px" height="48px" :src="item.user_avatar" alt="" srcset="">
                    <div style="height: 48px;line-height: 48px; margin-left: 16px;">{{item.user_nickname}}</div>
                </div>
                <div class="content_body">
                    {{item.content}}
                </div>
                <div class="content_footer">
                    <span>{{item.created_at}}</span>
                    <span v-if="item.user_nickname == states.userProfile.nickname" style="color: red; margin-left: 16px;cursor: pointer; font-weight: normal;" @click="handleDelete(item.id)">Delete</span>
                </div>
              <el-divider />
            </div>
            <el-pagination layout="prev, pager, next" v-model:current-page="states.currentPage" :total="states.total" :background="false" :page-size="3" @current-change="handleCurrentChange"/>
            <div style="width: 80%;display: flex; margin-bottom: 16px;">
                <el-input v-model="states.input" style="width: 100%" placeholder="Please input..." />
                <div @click="handlePost()" style="font-size: 16px;margin-left: 16px;border: 2px solid;padding: 4px 16px;border-radius: 16px;cursor: pointer;">Post</div>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive,onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { postMessageBoardApi,getMessageBoardListApi,deleteMessageBoardApi } from "@/api/messageBoard/messageBoard";
  import { ElMessage, ElMessageBox } from 'element-plus'
  import dayjs from 'dayjs';

  const router = useRouter();
  
  const states = reactive({
    registerUsername: null,
    registerPassword: null,
    registerPasswordAgain: null,
    loginUsername: null,
    loginPassword: null,
    input:'',
    messageBoardList:[],
    total:null,
    currentPage:1,
    limit:3,
    offset:0,
    userProfile:{}
  });
  
  const goCategory = () =>{
    router.push("/category");
  }

  const handlePost = ()=>{
    postMessageBoardApi({content:states.input}).then(res=>{
      states.input = ''
      states.total += 1
      states.currentPage = Math.trunc(states.total/states.limit)+1
      states.offset = Math.trunc(states.total/states.limit) *states.limit
      getMessageBoardList()
    })
  }

  const handleDelete = (id)=>{
    ElMessageBox.confirm(
    'proxy will permanently delete the message. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      deleteMessageBoardApi({id:id}).then(()=>{
        getMessageBoardList()
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

  const handleCurrentChange =(val)=>{
    states.offset = states.limit * (val-1)
    getMessageBoardList()
  }

  const getMessageBoardList = ()=>{
    let params = {
      is_self:0,
      limit:states.limit,
      offset:states.offset
    }
    getMessageBoardListApi(params).then(res=>{
      states.total = res.count
      res.list.forEach(item=>{
        item.created_at = dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')
      })
      states.messageBoardList = res.list
    })
  } 

  onMounted(()=>{
    getMessageBoardList()
    states.userProfile = JSON.parse(localStorage.getItem('userProfile'))
  })
  </script>
  
  <style lang="scss" scoped>
  .main {
    height: 100%;
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
      .main_body_right{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .content{
            display: flex;
            flex-direction: column;
            width: 100%;
            .content_header{
                display: flex;
                justify-content: start;
                font-size: 24px;
                margin-bottom: 16px;

            }
            .content_body{
                margin-bottom: 16px;
            }
            .content_footer{
                display: flex;
                justify-content: end;
                font-size: 20px;
                font-weight: bold;
            }

        }
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

  .el-pagination{
    --el-pagination-bg-color:#000;
    --el-pagination-button-color:#fff;
    --el-pagination-button-disabled-bg-color:#000;
    margin-bottom: 16px;
  }
  </style>
  