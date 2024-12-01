<style lang="scss" scoped>
.pages {
  position: relative;
  left: 10%;
  margin-top: 0;
  padding-top: 0;
  width: 80%;
  justify-content: space-around;
  margin-bottom: 100px;
  button {
    width: 100px;
    height: 60px;
    border: none;
    border-radius: 20px;
  }
}

form {
  padding-top: 10%;
}
.find-meet {
  background-color: #008d49;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  height: 52px;
  border-radius: 80px;
  input {
    position: relative;
    top: 5%;
    left: 1%;
    width: 70%;
    height: 45px;
    border-radius: 80px;
    border: none;
  }

  button {
    position: relative;
    height: 45px;
    background-color: transparent;
    border: none;
    color: white;
    top: 5%;
    width: 30%;
  }
}
.filtres_date {
  justify-content: space-around;
  flex-direction: column-reverse;
  margin-top: 10px;
  margin-bottom: 10px;
  input {
    background-color: transparent;
    border: none;
  }
  button {
    border: none;
    border-radius: 20px;
    background-color: #008d49;
    color: white;
  }
}

.filtress {
  position: fixed;
  top: 15%;
  left: 5%;
  z-index: 10;
  width: 90%;
  height: 60%;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.874);
  button {
    position: relative;
    top: 10px;
    width: 40%;
    left: 28%;
    border: 1px solid #008d49;
    border-radius: 20px;
    background-color: #008d49;
    color: white;
  }
}

.one_block-wrapper {
  position: relative;
  margin: 20px 0;
}

.one_block {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  z-index: 1;
}

.state-label {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  z-index: 2;
  color: #fff;
}

.state-started {
  background-color: #28a745;
}

.state-ended {
  background-color: #6c757d;
}

.state-booked {
  background-color: #17a2b8;
}

.blue {
  background-color: #70abf2 !important;
}

.block_info {
  width: 90%;
  position: relative;
  padding-bottom: 10px;
  left: 5%;
  flex-direction: column;
  justify-content: center;
  * {
    display: flex;
    justify-content: center;
  }
  button {
    display: block;
    width: 100% !important;
    left: 5%;
    background-color: #008d49;
    position: relative;
    border-radius: 15px;
  }
  div {
    padding-top: 10px;
  }
}

.two_button {
  position: relative;
  right: 5%;
  width: 100% !important;
  button {
    border: none;
    margin-left: 10px;
    width: 100% !important;
  }
}

.fitnes {
  width: 100%;
  color: #008d49;
  justify-content: space-between;
  select {
    width: 50%;
    overflow: hidden;
    border: 2px solid #008d49;
    border-radius: 20px;
    background-color: white;
    color: #008d49;
  }
  margin-top: 10px;
  margin-bottom: 10px;
}

.one_block {
  width: 100%;
  border: 2px solid green;
  border-radius: 15px;
  * {
    margin-bottom: 5px;
    padding: 5px;
  }
}
</style>

<template>
  <form @submit.prevent="filtred_meetings">
    <div class="w-80 find-meet">
      <input v-model="filter" />
      <button @click="page = 1">Найти</button>
    </div>
    <div class="d-flex flex-row filtres_date">
      <button
        type="button"
        @click="
          () => {
            filterActive = !filterActive
          }
        "
      >
        фильтры
      </button>
      <div class="d-flex flex-column">
        <input v-model="fromDatetime" type="datetime-local" id="datetime" name="datetime" />
        <input v-model="toDatetime" type="datetime-local" id="todatetime" name="todatetime" />
      </div>
    </div>

    <div v-if="filterActive" class="filtress">
      <div class="d-flex flex-row fitnes">
        <div>Статус</div>
        <select v-model="state" name="select-state" id="select-state">
          <option value=""></option>
          <option value="booked">Забранирована</option>
          <option value="cancelled">Отменена</option>
          <option value="started">Начата</option>
          <option value="ended">Закончена</option>
        </select>
      </div>
      <div class="d-flex flex-row fitnes">
        <div>Департамент</div>
        <select v-model="departamentId" name="select-state" id="select-state">
          <option value="">-</option>
          <option v-for="deps in deparments.data" :key="deps.id" :value="deps.id">
            {{ deps.name }}
          </option>
        </select>
      </div>
      <div class="d-flex flex-row fitnes">
        <div>Организатор</div>
        <select v-model="organizedBy" name="select-state" id="select-state">
          <option value="">-</option>
          <option v-for="owner in owners.data" :key="owner.id" :value="owner.id">
            {{ owner.firstName }} {{ owner.lastName }}
          </option>
        </select>
      </div>
      <button
        type="button"
        @click="
          () => {
            filterActive = !filterActive
          }
        "
      >
        Готово
      </button>
    </div>
  </form>
  <div v-if="meetings != null" class="block_info">
    <div v-for="meet in meetings" :key="meet.id" class="one_block-wrapper">
      <div :class="['state-label', getStateClass(meet.state)]">
        {{ getStateText(meet.state) }}
      </div>
      <div class="d-flex flex-column one_block">
        <h3>{{ meet.name }}</h3>
        <span>
          {{ meet.startedAt.split('T')[0] }}, {{ meet.startedAt.split('T')[1].slice(0, 5) }} -
          {{ meet.duration }} мин
        </span>
        <div class="d-flex flex-row align-center">
          <b>Организатор:</b>
          <span>{{ meet.createdByName }}</span>
        </div>
        <div class="d-flex flex-row two_button">
          <button class="btn btn-primary blue">Присоедениться к ВКС</button>
          <button @click="meet.moreInfo = !meet.moreInfo" class="btn btn-primary w-25">
            {{ meet.moreInfo ? 'Свернуть' : 'Подробнее' }}
          </button>
        </div>
        <div v-if="meet.moreInfo" class="d-flex flex-column">
          <b>Место проведения:</b>
          <span>{{ meet.departamentName }}</span>
          <b>Помещение:</b>
          <span>{{ meet.roomInfo }}</span>
          <b>Студенты:</b>
          <div class="d-flex flex-row">
            <span v-for="part in meet.participants" :key="part.id">
              {{ part.lastName }} {{ part.firstName }} &nbsp;
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex flex-row pages" v-if="meetings != null && meetings.length > 3">
    <button
      @click="
        () => {
          if (page > 1) {
            page--
            filtred_meetings()
          } else {
          }
        }
      "
    >
      <
    </button>
    <button
      @click="
        () => {
          page += 1
          filtred_meetings()
        }
      "
    >
      >
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
const now = new Date()

var filterActive = ref(false)
var isMoreInfo = ref(false)
var meetings = ref('')
const page = ref(1)
const rowsNumber = ref('1')
const filter = ref('')
const state = ref('started')
const showDeleted = ref('true')
const deparments = ref([])
const owners = ref([])
const departamentId = ref(2)
const organizedBy = ref(1)

function getStateClass(state) {
  switch (state) {
    case 'started':
      return 'state-started'
    case 'ended':
      return 'state-ended'
    case 'booked':
      return 'state-booked'
    case 'cancelled':
      return 'state-cancelled'
    default:
      return ''
  }
}
function getStateText(state) {
  switch (state) {
    case 'started':
      return 'Началось'
    case 'ended':
      return 'Завершено'
    case 'booked':
      return 'Забронировано'
    case 'cancelled':
      return 'state-cancelled'
    default:
      return ''
  }
}

onMounted(async () => {
  deparments.value = await get_departments()
  owners.value = await get_owners()
  await filtred_meetings()
})

const fromDatetime = ref(
  new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
)
const toDatetime = ref(new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16))

const filtred_meetings = async () => {
  axios({
    method: 'get',
    url: 'https://test.vcc.uriit.ru/api/meetings?',
    params: {
      page: page.value,
      rowsNumber: 1,
      departmentid: departamentId.value ? departamentId.value : undefined,
      organizedBy: organizedBy.value ? organizedBy.value : undefined,
      filter: filter.value ? filter.value : undefined,
      rowsPerPage: 3,
      state: state.value ? state.value : undefined,
      fromDatetime: fromDatetime.value + ':00.000',
      toDatetime: toDatetime.value + ':00.000',
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(async (response) => {
      console.log(response.data.data)
      var temp = response.data.data
      console.log(temp)
      console.log(fromDatetime.value + ':00.000')
      for (let meet of temp) {
        var tempInfo = await get_meetInfo(meet.id)
        console.log(tempInfo.participants)
        if (
          meet.organizedBy == localStorage.getItem('id') ||
          tempInfo.participants?.some((user) => user.id === localStorage.getItem('id'))
        ) {
          meet.createdByName = await get_user(meet.createdBy)
          meet.roomInfo = tempInfo.room
            ? `${tempInfo.room.name} ${tempInfo.room.description}`
            : `Не указано`
          if (tempInfo.room != null)
            meet.departamentName = tempInfo.room.buildingId
              ? await get_depName(tempInfo.room.buildingId)
              : 'Не указано'
          else meet.departamentName = 'Не указано'

          meet.participants = tempInfo.participants
          meet.moreInfo = false
          console.log(meet)
          // meet.link = tempInfo.ciscoRoom.connectUrl ? tempInfo.ciscoRoom.connectUrl : undefined
        } else {
          temp = temp.filter((item) => item !== meet)
        }
      }
      console.log(temp)
      meetings.value = temp
    })
    .catch((error) => {
      console.error(error)
    })
}

const get_user = async (id) => {
  try {
    const response = await axios.get(`https://test.vcc.uriit.ru/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    // if ((response.data.lastName = ' ' && response.data.firstName == ' ')) {
    //   return 'Не указан'
    // } else {
    return `${response.data.lastName} ${response.data.firstName}`
  } catch (error) {
    console.error(`Ошибка при загрузке пользователя с ID ${id}:`, error)
    return 'none'
  }
}

const get_meetInfo = async (id) => {
  try {
    const response = await axios.get(`https://test.vcc.uriit.ru/api/meetings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Ошибка при загрузке мероприятия с ID ${id}:`, error)
    return 'none'
  }
}

const get_depName = async (id) => {
  try {
    const response = await axios.get(`https://test.vcc.uriit.ru/api/catalogs/buildings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.name ? response.data.name : 'Не указано'
  } catch (error) {
    console.error(`Ошибка при загрузке депортамента с ID ${id}:`, error)
    return 'none'
  }
}

const get_departments = async () => {
  try {
    const response = await axios.get(`https://test.vcc.uriit.ru/api/catalogs/departments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Ошибка при загрузке пользователя с ID ${id}:`, error)
    return 'none'
  }
}
//Получение пользователей
const get_owners = async () => {
  try {
    const response = await axios.get(`https://test.vcc.uriit.ru/api/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Ошибка при загрузке пользователя с ID ${id}:`, error)
    return 'none'
  }
}
</script>
