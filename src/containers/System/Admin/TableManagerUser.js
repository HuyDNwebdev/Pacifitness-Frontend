import React, { Component } from "react"
import "./TableManagerUser.scss"
import { connect } from "react-redux"
import * as actions from "../../../store/actions"

class TableManagerUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usersRedux: [],
    }
  }

  componentDidMount() {
    this.props.fetchAllUser()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        usersRedux: this.props.users,
      })
    }
  }

  handleDeleteUser = (id) => {
    this.props.deleteUserStart(id)
  }

  handleEditUser = (user) => {
    this.props.handleEditFromChild(user)
  }

  render() {
    let arrUser = this.state.usersRedux

    return (
      <table id="TableManageUser">
        <tbody>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
          {arrUser &&
            arrUser.length > 0 &&
            arrUser.map((item, index) => {
              return (
                <tr className="divClass" key={index}>
                  <td>{item.email}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => this.handleEditUser(item)}
                    >
                      <i className="fas fa-pencil-alt"></i>
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
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUser: () => dispatch(actions.fetchAllUserStart()),
    deleteUserStart: (id) => dispatch(actions.deleteUserStart(id)),
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser)
