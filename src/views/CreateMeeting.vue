<template>
  <main>
    <form class="center-form" @submit.prevent="CreateMeeting">
      <div class="mb-3 block">
        <label for="name">Название*</label>
        <input type="text" id="name" v-model="name" class="vvod" required />
      </div>
      <div class="mb-3 block">
        <label for="dateTime">Дата и время*</label>
        <input type="datetime-local" id="dateTime" v-model="date" class="vvod" required />
      </div>
      <div class="mb-3 block">
        <label for="duration">Продолжительность (мин)*</label>
        <input type="number" id="duration" v-model="duration" class="vvod" required />
      </div>
      <div class="mb-3 block">
        <label for="maxPerson">Максимальное количество человек*</label>
        <input type="number" id="maxPerson" v-model="maxPerson" class="vvod" required />
      </div>
      <div class="mb-3 block">
        <label for="participants">Участники*</label>
        <div class="participants-container">
          <div
            v-for="participant in selectedParticipants"
            :key="participant"
            class="participant-tag"
          >
            {{ participant.firstName }} {{ participant.middleName }}
            <button type="button" class="small" @click="removeParticipant(participant)">✖</button>
          </div>
          <input
            type="text"
            id="participants"
            class="vvod"
            v-model="searchText"
            @input="onInput"
            placeholder="Введите email для добавления"
          />
        </div>
        <ul v-if="filteredUsers.length > 0 && searchText !== ''" class="dropdown">
          <li
            v-for="user in filteredUsers"
            :key="user.email"
            @click="addParticipant(user)"
            class="dropdown-item"
          >
            {{ user.email }}
          </li>
        </ul>
      </div>
      <div class="mb-3 block">
        <label for="place">Место проведения</label>
        <select id="place" v-model="place" required>
          <option v-for="item in places" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="mb-3 block">
        <label for="room">Помещение</label>
        <select id="room" v-model="room">
          <option v-for="item in filteredRooms" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <button type="submit">Создать конференцию</button>
      <p align="center" class="underwrite">Заполните все обязательные поля (*) перед созданием</p>
    </form>
  </main>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'

export default {
  setup() {
    // State
    const organizer = ref(localStorage.getItem('id'))
    const searchText = ref('')
    const selectedParticipants = ref([])
    const users = ref([])
    const filteredUsers = computed(() =>
      users.value.filter(
        (user) =>
          user.email.includes(searchText.value) && !selectedParticipants.value.includes(user.email),
      ),
    )

    const maxPerson = ref(1)
    const name = ref('')
    const date = ref(new Date().toISOString().slice(0, 16))
    const duration = ref('')
    const place = ref('')
    const room = ref('')
    const places = ref([])
    const rooms = ref([])
    const filteredRooms = computed(() =>
      place.value ? rooms.value.filter((room) => room.buildingId === place.value) : [],
    )

    // API calls
    const getUsers = async (text) => {
      try {
        const response = await axios.get('https://test.vcc.uriit.ru/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: { email: text },
        })
        users.value = response.data.data
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error)
      }
    }

    const getBuildings = async () => {
      try {
        const response = await axios.get('https://test.vcc.uriit.ru/api/catalogs/buildings', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        places.value = response.data.data
      } catch (error) {
        console.error('Ошибка при загрузке зданий:', error)
      }
    }

    const getRooms = async () => {
      try {
        const response = await axios.get('https://test.vcc.uriit.ru/api/catalogs/rooms', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        rooms.value = response.data.data
      } catch (error) {
        console.error('Ошибка при загрузке помещений:', error)
      }
    }

    const CreateMeeting = async () => {
      try {
        await axios.post(
          'https://test.vcc.uriit.ru/api/meetings',
          {
            attachments: [],
            backend: 'vinteo',
            ciscoSettings: {
              isMicrophoneOn: true,
              isVideoOn: true,
              isWaitingRoomEnabled: false,
              needVideoRecording: true,
            },
            comment: '',
            duration: duration.value,
            endedAt: null,
            externalSettings: { externalUrl: '', permanentRoomId: null },
            groups: [],
            id: null,
            isGovernorPresents: false,
            isNotifyAccepted: true,
            isVirtual: false,
            name: name.value,
            organizedBy: { id: 1 },
            participants: selectedParticipants.value,
            participantsCount: maxPerson.value.toString(),
            recurrence: null,
            roomId: room.value,
            sendNotificationsAt: 0,
            startedAt: `${date.value}:00.000`,
            state: 'booked',
            vinteoSettings: {
              needVideoRecording: true,
            },
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          },
        )
        alert('Конференция успешно создана!')
      } catch (error) {
        console.error('Ошибка при создании конференции:', error)
        console.log(date.value)
        alert('Ошибка при создании конференции.')
      }
    }

    // Handlers
    const addParticipant = (user) => {
      // Проверяем, есть ли уже пользователь в списке участников
      if (!selectedParticipants.value.some((participant) => participant.id === user.id)) {
        selectedParticipants.value.push({
          id: user.id,
          lastName: user.lastName,
          firstName: user.firstName,
          middleName: user.middleName,
          roleIds: user.roleIds,
        })
        searchText.value = '' // Очищаем поле поиска
        maxPerson.value = Math.max(maxPerson.value, selectedParticipants.value.length)
      }
    }

    const removeParticipant = (email) => {
      selectedParticipants.value = selectedParticipants.value.filter(
        (participant) => participant !== email,
      )
    }

    const onInput = () => {
      if (searchText.value) {
        getUsers(searchText.value)
      }
    }

    // Lifecycle
    onMounted(async () => {
      await getBuildings()
      await getRooms()
    })

    watch(place, () => {
      // Пересчет фильтрованных комнат при изменении здания
    })

    // Return bindings
    return {
      organizer,
      searchText,
      selectedParticipants,
      filteredUsers,
      addParticipant,
      removeParticipant,
      onInput,
      maxPerson,
      name,
      date,
      duration,
      place,
      room,
      places,
      rooms,
      filteredRooms,
      CreateMeeting,
    }
  },
}
</script>

<style lang="scss" scoped>
.body {
  background-color: rgba(201, 226, 255, 1) !important;
}

.center-form {
  position: fixed;
  width: 75%;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;

  button {
    background: #ffffff !important;
  }

  div.block {
    display: flex;
    flex-direction: column;
  }

  input.vvod {
    height: 40px;
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    border: 2px solid black;
  }

  label {
    font-size: medium;
  }

  .bottom {
    margin-bottom: 30px;
  }

  select {
    height: 40px;
    width: 100%;
    border-radius: 10px;
    border: 2px solid black;
  }

  button {
    margin: 0 auto;
    height: 45px;
    width: 75%;
    margin-top: 20px;
    border-radius: 10px;
    font-size: medium;
  }

  .underwrite {
    margin: 0 auto;
    font-size: small;
    margin-top: 8px;
    width: 70%;
    color: rgb(86, 184, 255);
  }

  option {
    width: 50px;
  }

  button.small {
    width: 30px !important;
    height: 30px !important;
    margin-top: 0;
    margin-bottom: 2px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
