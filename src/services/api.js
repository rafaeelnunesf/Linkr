import axios from "axios";

const BASE_URL = "http://localhost:5000"

function createConfig(token) {
  return { headers: { 'Authorization': `Bearer ${token}` } }
}

async function getImageProfile(token) {
  const config = createConfig(token)
  const image = await axios.get(`${BASE_URL}/header`, config)
  return image
}

async function searchUser(token, query) {

  const config = createConfig(token)
  const usersList = await axios.get(`${BASE_URL}/searchusers?name=${query}`, config)
  return usersList.data
}

async function postPublication(token, body) {

  const config = createConfig(token)

  await axios.post(`${BASE_URL}/publication`, { ...body }, config)

}

async function getHashtagRankingList(token) {
  const config = createConfig(token)
  const list = await axios.get(`${BASE_URL}/hashtagranking`, config)
  return list
}

const api = {
  getImageProfile,
  searchUser,
  postPublication,
  getHashtagRankingList
}

export default api