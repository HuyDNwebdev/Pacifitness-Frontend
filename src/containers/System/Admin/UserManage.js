import React, { Component } from "react"
import "./UserManage.scss"
import { connect } from "react-redux"

import {
  getAllUsers,
  createNewUserService,
  DeleteUserService,
  UpdateUserService,
} from "../../../services"
import ModalUser from "../ModalUser"
import ModalEditUser from "../ModalEditUser"
import { emitter } from "../../../utils/emitter"

class UserManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    }
  }

  async componentDidMount() {
    await this.getAllUsersFromReact()
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL")
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      })
    }
  }

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    })
  }
  handleAddnewUser = () => {
    this.setState({
      isOpenModalUser: true,
    })
  }
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data)
      if (response && response.errCode !== 0) {
        alert(response.errMessage)
      } else {
        await this.getAllUsersFromReact()
        this.toggleUserModal()

        emitter.emit("EVENT_CLEAR_MODAL_DATA")
      }
    } catch (e) {
      console.log(e)
    }
  }

  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    })
  }
  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    })
  }
  doEditUser = async (data) => {
    try {
      let response = await UpdateUserService(data)
      if (response && response.errCode !== 0) {
        alert(response.errMessage)
      } else {
        await this.getAllUsersFromReact()
        this.toggleUserEditModal()
      }
    } catch (e) {
      console.log(e)
    }
  }

  handleDeleteUser = async (userId) => {
    try {
      let response = await DeleteUserService(userId)
      if (response && response.errCode !== 0) {
        alert(response.message)
      } else {
        await this.getAllUsersFromReact()
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className="user-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center">Manage users with React</div>
        <div className="mx-3">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddnewUser()}
          >
            <i className="fas fa-plus"></i> Add new user
          </button>
        </div>
        <div className="user-table mt-3 mx-3">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>

              {this.state.arrUsers &&
                this.state.arrUsers.map((item, index) => {
                  return (
                    <tr className="divClass" key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button className="btn-edit">
                          <i
                            className="fas fa-pencil-alt"
                            onClick={() => this.handleEditUser(item)}
                          ></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default connect()(UserManage)
// mapStateToProps, mapDispatchToProps
