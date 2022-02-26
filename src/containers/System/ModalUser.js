import React, { Component } from "react"
import { connect } from "react-redux"

import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap"
import { emitter } from "../../utils/emitter"

class ModalUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    }
    this.listenToEmitter()
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      //reset state
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      })
    })
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent()
  }

  handleOnChangeInput = (event, id) => {
    //bat data from form input and set no vo state
    // bad code
    /** 
    this.state[id] = event.target.value
    this.setState(
      {
        ...this.state,
      },
      () => {
        console.log("check bad state: ", this.state)
      }
    )
    */
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
  handleAddNewUser = async () => {
    let isValid = await this.checkValidInput()
    if (isValid === true) {
      //call api create modal
      this.props.createNewUser(this.state)
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
          <ModalHeader toggle={this.toggle}>Create a new user</ModalHeader>
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
              onClick={this.handleAddNewUser}
            >
              Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser)
