import actionTypes from "./actionTypes"
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  DeleteUserService,
  UpdateUserService,
  getTopDoctorHomeService,
} from "../../services"
import { toast } from "react-toastify"

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START })

      let res = await getAllCodeService("GENDER")
      if (res && res.errCode === 0) {
        // console.log("check get state: ", getState)
        dispatch(fetchGenderSuccess(res.data))
      } else {
        dispatch(fetchGenderFailed())
      }
    } catch (error) {
      dispatch(fetchGenderFailed(error))
      console.log("fetchGenderStart error", error)
    }
  }
}

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
})

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
})

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START })

      let res = await getAllCodeService("Position")
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data))
      } else {
        dispatch(fetchPositionFailed())
      }
    } catch (error) {
      dispatch(fetchPositionFailed())
      console.log("fetchPositionStart error", error)
    }
  }
}

export const fetchPositionSuccess = (PositionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: PositionData,
})

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
})

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START })

      let res = await getAllCodeService("ROLE")
      // console.log(res.data)
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data))
      } else {
        dispatch(fetchRoleFailed())
      }
    } catch (error) {
      dispatch(fetchRoleFailed())
      console.log("fetchRoleStart error", error)
    }
  }
}

export const fetchRoleSuccess = (RoleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: RoleData,
})

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
})

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data)
      console.log("Check create user: ", res)
      if (res && res.errCode === 0) {
        dispatch(createUserSuccess())
        toast.success("🦄 Create a new user succeed!")
        dispatch(fetchAllUserStart())
      } else {
        dispatch(createUserFailed())
      }
    } catch (error) {
      dispatch(createUserFailed())
      console.log("saveUser failed error", error)
    }
  }
}

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
})
export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
})

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL")
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users))
      } else {
        toast.error("😲 Fetch all users error!")

        dispatch(createUserFailed())
      }
    } catch (error) {
      toast.error("😲 Fetch all users error!")

      dispatch(fetchAllUserFailed())
      console.log("fetchAllUserFailed error", error)
    }
  }
}

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data.reverse(),
})

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
})

export const deleteUserStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await DeleteUserService(id)
      // console.log("Check res delete user: ", res)
      if (res && res.errCode === 0) {
        toast.warn("👌 Delete a User Succeed!")

        dispatch(deleteUserSuccess())
        dispatch(fetchAllUserStart())
      } else {
        toast.error("😲 Delete a User error!")
        dispatch(deleteUserFailed())
      }
    } catch (error) {
      dispatch(deleteUserFailed())
      console.log("Delete user failed error", error)
    }
  }
}

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
})

export const editUserStart = (userData) => {
  return async (dispatch, getState) => {
    try {
      let res = await UpdateUserService(userData)
      console.log("Check res update user: ", res)
      if (res && res.errCode === 0) {
        toast.success("👌 Update a User Succeed!")

        await dispatch(editUserSuccess())
        dispatch(fetchAllUserStart())
      } else {
        toast.error("😲 Update a User error!")
        dispatch(editUserFailed())
      }
    } catch (error) {
      dispatch(editUserFailed())
      console.log("Update user failed error", error)
    }
  }
}

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
})

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("")
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        })
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        })
      }
    } catch (error) {
      console.log("FETCH_TOP_DOCTORS_FAILED", error)
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      })
    }
  }
}

// let res1 = await getTopDoctorHomeService("")
// console.log("Check get all user res1: ", res1)
