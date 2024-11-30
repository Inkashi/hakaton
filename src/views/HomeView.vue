<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const tg = window.Telegram.WebApp
const login = ref('')
const pass = ref('')

const Login = async () => {
  axios({
    method: 'post',
    url: 'https://test.vcc.uriit.ru/api/auth/login',
    data: {
      login: login.value,
      password: pass.value,
    },
  }).then(function (response) {
    console.log(response.data.user)
    tg.sendData(JSON.stringify(response.data))
    localStorage.setItem('token', response.data.token)
  })
}
</script>

<template>
  <main>
    <form class="center-form" @submit.prevent="Login">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          v-model="login"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input v-model="pass" type="password" class="form-control" id="password" required />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </main>
</template>

<style lang="scss" scoped>
.center-form {
  position: fixed;
  width: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.center-form {
  span {
    opacity: 60%;
  }
}
</style>
