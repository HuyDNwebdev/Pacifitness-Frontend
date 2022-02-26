import axios from "../axios"

const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password })
}

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-user?id=${inputId}`)
}

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data)
}

const DeleteUserService = (id) => {
  return axios.delete("/api/delete-user", { data: { id: id } })
}

const UpdateUserService = (data) => {
  return axios.put("/api/edit-user", data)
}

const getAllCodeService = (type) => {
  return axios.get(`/allcode?type=${type}`)
}

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

export {
  handleLogin,
  getAllUsers,
  createNewUserService,
  DeleteUserService,
  UpdateUserService,
  getAllCodeService,
  getTopDoctorHomeService,
}
