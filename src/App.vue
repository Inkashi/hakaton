<script setup>
import { ref } from 'vue'

const msg = ref('')
var temp = ref('Привет')
const tg = window.Telegram.WebApp
tg.expand()
function msgTelegram() {
  try {
    tg.s
  } catch (e) {
    msg.value = e
  }
  console.log(data)
  tg.close()
}

function sendMsg() {
  tg.sendData(msg.value)
}
</script>
<template>
  <body>
    <div class="remix">
      <h2>{{ temp }}</h2>
      <h1>{{ msg }}</h1>
      <input v-model="msg" />
      <button @click="sendMsg">Отправить</button>
      <button class="btn btn-primary">Кнопка</button>
    </div>
    <button>Кнопка</button>
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
