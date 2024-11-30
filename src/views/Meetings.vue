<template>
  <h1>Hello</h1>
  <div v-if="meetings != null">
    <div v-for="meet in meetings">{{ meet.name }}</div>
  </div>
  <button @click="Login"></button>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
var meetings = ref('')
const Login = async () => {
  axios({
    method: 'get',
    url: 'https://test.vcc.uriit.ru/api/meetings?',
    params: {
      page: 1,
      rowsNumber: 1,
      filter: '23к',
      showDeleted: true,
      state: 'started',
      fromDatetime: '2024-11-30T00:00:00.000',
      toDatetime: '2024-12-01T00:00:00.000',
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((response) => {
      meetings = response.data.data
      console.log('Response data:', response.data.data)
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<style lang="scss" scoped></style>
