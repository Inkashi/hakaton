<script setup>
import { ref } from 'vue'
const msg = ref('')
var temp = ref('Привет')
const tg = window.Telegram.WebApp
import { RouterLink, RouterView } from 'vue-router'
var token
tg.expand()
</script>
<template>
  <header>
    <nav>
      <!-- <RouterLink to="/login">На логин</RouterLink> -->
    </nav>
  </header>
  <body>
    <RouterView />

    <!-- <div class="">
      <h2>{{ temp }}</h2>
      <h1>{{ msg }}</h1>
      <input v-model="msg" />
      <button @click="sendMsg">Отправить</button>
      <button class="btn btn-primary">Кнопка</button>
    </div>
    <button>Кнопка</button> -->
  </body>
</template>

<style lang="scss" scoped>
.remix {
  width: max-content;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20rem;
}
</style>
