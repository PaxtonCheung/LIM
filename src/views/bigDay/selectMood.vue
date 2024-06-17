<template>
    <div class="back" @click="goSelectWeather">Back</div>
    <div class="main">
      <div style="text-align: center;margin-bottom: 72px;font-size: 72px; color: #fff;font-weight: bold;">How about you?</div>
      <div class="main_body">
        <svg @click="goSubmitBigDay('')" xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
        <svg @click="goSubmitBigDay('')" xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-mood-sad" width="128" height="128" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
            <circle cx="12" cy="12" r="9" />
            <line x1="9" y1="10" x2="9.01" y2="10" />
            <line x1="15" y1="10" x2="15.01" y2="10" />
            <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
        </svg>
        <svg @click="goSubmitBigDay('')" xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" viewBox="0 0 20 20"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM7 13h6a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z"/></svg>
        <svg @click="goSubmitBigDay('')" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mood-confuzed" width="128" height="128" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <circle cx="12" cy="12" r="9" />
            <line x1="9" y1="10" x2="9.01" y2="10" />
            <line x1="15" y1="10" x2="15.01" y2="10" />
            <path d="M9.5 16a10 10 0 0 1 6 -1.5" />
        </svg>
        <svg @click="goSubmitBigDay('')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="128" height="128">
            <path fill="var(--ci-primary-color, currentColor)" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z" class="ci-primary"/>
            <path fill="var(--ci-primary-color, currentColor)" d="M256,280A104,104,0,0,0,152,384H360A104,104,0,0,0,256,280Z" class="ci-primary"/>
            <rect width="32.001" height="96.333" x="148" y="159.834" fill="var(--ci-primary-color, currentColor)" class="ci-primary" transform="rotate(-48.366 164.002 208.001)"/>
            <rect width="96.333" height="32" x="291.834" y="192" fill="var(--ci-primary-color, currentColor)" class="ci-primary" transform="rotate(-48.366 340.002 208)"/>
        </svg>
        
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from "vue";
  import { useRoute, useRouter } from "vue-router";
  const router = useRouter();
  
  const states = reactive({
    title: "",
    content: "",
  });
  
  const goSelectWeather = () => {
    router.push("/selectWeather");
  };
  const goSubmitBigDay = ()=>{
    router.push("/submitBigDay");
  }
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
      grid-gap: 128px; /* 设置列与列之间的间隔 */
      text-align: center;
      color: #fff;
      font-size: 48px;
      cursor: pointer;
      div {
        font-weight: bold;
      }
    }
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
  </style>
  