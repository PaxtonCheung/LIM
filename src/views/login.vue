<template>
  <div class="flip_card_container">
    <div class="flip_card" :class="{ flipped: isFlipped }">
      <div class="flip_card_front">
        <!-- 注册 -->
        <div @click="toggleFlip" class="card_header" style="">Log in</div>
        <div class="underline_input_wrapper">
          <div class="card_label">Account</div>
          <div>
            <input
              style="color: #fff"
              type="text"
              v-model="states.registerUsername"
            />
          </div>
        </div>
        <div class="underline_input_wrapper">
          <div class="card_label">Password</div>
          <div>
            <div>
              <input
                style="color: #fff"
                type="password"
                v-model="states.registerPassword"
              />
            </div>
          </div>
        </div>
        <div class="underline_input_wrapper">
          <div class="card_label">Confirm Password</div>
          <div>
            <div>
              <input
                style="color: #fff"
                type="password"
                v-model="states.registerPasswordAgain"
              />
            </div>
          </div>
        </div>
        <div class="card_btn" @click="handleRegister()">Sign Up</div>
      </div>
      <div class="flip_card_back">
        <!-- 登录 -->
        <div @click="toggleFlip" class="card_header">Sign Up</div>
        <div class="underline_input_wrapper">
          <div class="card_label">Account</div>
          <div>
            <input
              style="color: #fff"
              type="text"
              v-model="states.loginUsername"
            />
          </div>
        </div>
        <div class="underline_input_wrapper">
          <div class="card_label">Password</div>
          <div>
            <input
              style="color: #fff"
              type="password"
              v-model="states.loginPassword"
            />
          </div>
        </div>
        <div class="card_btn" @click="handleLogin()">Log in</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { register, login, getUserProfile } from "@/api/user";
import { ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const states = reactive({
  registerUsername: null,
  registerPassword: null,
  registerPasswordAgain: null,
  loginUsername: null,
  loginPassword: null,
});
const isFlipped = ref(true);
const toggleFlip = () => {
  isFlipped.value = !isFlipped.value;
};
const handleRegister = () => {
  if(states.registerPassword == states.registerPasswordAgain){
    let data = {
    username: states.registerUsername,
    password: states.registerPassword,
  };
  register(data).then((i) => {
    login(data).then((res) => {
      if (res.token) {
        localStorage.setItem("token", res.token);
        getUserProfile().then((resp) => {
          localStorage.setItem("userProfile", JSON.stringify(resp));
          if(resp.nickname && resp.avatar){
            router.push("/home");
          }else{
            router.push("/userProfile");
          }
        });
      }
    });
  });
  }else{
    ElMessageBox.alert("Password mismatch detected. Please re-enter your passwords to ensure consistency.", 'Tips', {
    confirmButtonText: 'OK',
  })
  }

};

const handleLogin = () => {
  let data = {
    username: states.loginUsername,
    password: states.loginPassword,
  };
  login(data).then((res) => {
    console.log(res);
    if (res.token) {
      localStorage.setItem("token", res.token);
      getUserProfile().then((resp) => {
        localStorage.setItem("userProfile", JSON.stringify(resp));
      });
      router.push("/home");
    }
  });
};
</script>

<style scoped>
.card_header {
  cursor: pointer;
  align-self: start;
  margin-left: 32px;
  font-size: 24px;
  font-weight: bold;
}
.flip_card_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: auto;
}

.flip_card {
  width: 25vw;
  height: 50vh;
  border: 2px solid #ccc;
  border-radius: 10px;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.flip_card.flipped {
  transform: rotateY(180deg);
}

.flip_card_front,
.flip_card_back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
}

.flip_card_front {
}

.flip_card_back {
  transform: rotateY(180deg);
}
.underline_input_wrapper {
  display: flex;
  position: relative;
}

.underline_input_wrapper input {
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  box-shadow: 0 2px 0 0 #ccc; /* 下划线模拟 */
  font-size: 16px;
  transition: box-shadow 0.3s ease;
  background-color: transparent;
}

.underline_input_wrapper input:focus {
  box-shadow: 0 2px 0 0 #fff; /* 下划线颜色变化 */
}
.card_btn {
  border: 2px solid #ccc;
  font-weight: bold;
  text-align: center;
  border-radius: 10px;
  padding: 8px 32px;
  cursor: pointer;
}
.card_btn:hover {
  border: 2px solid #fff;
}
.card_label {
  height: 40px;
  line-height: 40px;
  font-weight: bold;
}
</style>
