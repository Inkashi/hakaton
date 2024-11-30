<script setup>
defineExpose({
  get_departments,
  get_builds,
  get_owners,
  get_room,
})

//Получение департаментов
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

const get_builds = async () => {
  try {
    const response = await axios.get(`https://test.vcc.uriit.ru/api/catalogs/buildingss`, {
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

const get_room = async (id) => {
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
</script>
