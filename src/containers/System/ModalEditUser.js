import React, { Component } from "react"
import { connect } from "react-redux"

import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap"
import { emitter } from "../../utils/emitter"
import _ from "lodash"

class ModalEditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    }
  }

  componentDidMount() {
    let user = this.props.currentUser
    console.log("did mount edit modal: ", user)
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hardcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      })
    }
  }

  toggle = () => {
    this.props.toggleFromParent()
  }

  handleOnChangeInput = (event, id) => {
    // good code
    let copyState = { ...this.state }
    copyState[id] = event.target.value

    this.setState({
      ...copyState,
    })
  }

  checkValidInput = () => {
    let isValid = true
    let arrInput = ["email", "password", "firstName", "lastName", "address"]
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        alert("Missing parameter: " + arrInput[i])
        isValid = false
        return isValid
      }
    }
    return true
  }

  handleEditUser = async () => {
    let isValid = await this.checkValidInput()
    if (isValid === true) {
      //call api create modal
      this.props.editUser(this.state)
    }
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.toggle}
          className={"modal-user-container"}
          size="lg"
        >
          <ModalHeader toggle={this.toggle}>
            Edit Information of user
          </ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container ">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                  value={this.state.email}
                  disabled
                />
              </div>
              <div className="input-container ">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "password")
                  }
                  value={this.state.password}
                  disabled
                />
              </div>
              <div className="input-container  ">
                <label>First Name</label>
                <input
                  className="form-control"
                  name="firstName"
                  placeholder="First Name"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "firstName")
                  }
                  value={this.state.firstName}
                />
              </div>
              <div className="input-container  ">
                <label>Last Name</label>
                <input
                  className="form-control"
                  name="lastName"
                  placeholder="LastName"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "lastName")
                  }
                  value={this.state.lastName}
                />
              </div>
              <div className="input-container max-width-input">
                <label>Address</label>
                <input
                  className="form-control"
                  name="address"
                  placeholder="Address"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "address")
                  }
                  value={this.state.address}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={this.handleEditUser}
            >
              Save Changes
            </Button>{" "}
            <Button onClick={this.toggle} className="px-3">
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser)
