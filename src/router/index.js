import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login.vue";
import Home from "../views/home.vue";
import UserProfile from "../views/userProfile/index.vue";
import Category from "../views/category.vue";
import BigDay from "../views/tabs/bigDay.vue";
import Gallery from "../views/tabs/gallery.vue";
import InspirationArea from "../views/tabs/inspirationArea.vue";
import MessageBoard from "../views/tabs/messageBoard.vue";
import TimeLine from "../views/tabs/timeLine.vue";
import TodoList from "../views/tabs/todoList.vue";
import SelectWeather from "../views/bigDay/selectWeather.vue";
import SelectMood from "../views/bigDay/selectMood.vue";
import SubmitBigDay from "../views/bigDay/submitBigDay.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/userProfile",
      name: "userProfile",
      component: UserProfile,
    },
    {
      path: "/category",
      name: "category",
      component: Category,
    },
    {
      path: "/bigDay",
      name: "bigDay",
      component: BigDay,
    },
    {
      path: "/selectWeather",
      name: "selectWeather",
      component: SelectWeather,
    },
    {
      path: "/selectMood",
      name: "selectMood",
      component: SelectMood,
    },
    {
      path: "/submitBigDay",
      name: "submitBigDay",
      component: SubmitBigDay,
    },
    {
      path: "/gallery",
      name: "gallery",
      component: Gallery,
    },
    {
      path: "/inspirationArea",
      name: "inspirationArea",
      component: InspirationArea,
    },
    {
      path: "/messageBoard",
      name: "messageBoard",
      component: MessageBoard,
    },
    {
      path: "/timeLine",
      name: "timeLine",
      component: TimeLine,
    },
    {
      path: "/todoList",
      name: "todoList",
      component: TodoList,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 检查用户是否已登录，这里假设token存储在Vuex store中
  if (to.path === '/') {
    next(); // 直接前往登录页
  } else if (!localStorage.getItem('token')) {
    next('/'); // 如果没有token，跳转到登录页
  } else {
    next(); // 如果有token，继续前往目标路由
  }
});

export default router;
