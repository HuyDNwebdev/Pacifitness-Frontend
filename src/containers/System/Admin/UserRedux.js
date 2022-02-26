import React, { Component } from "react"
import { FormattedMessage } from "react-intl"
import { connect } from "react-redux"

import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"

import * as actions from "../../../store/actions"
import "./UserRedux.scss"
import TableManagerUser from "./TableManagerUser"

class UserRedux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      file: "",
      imagePreviewUrl: "",
      isOpenImage: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      position: "",
      gender: "",
      role: "",
      image: "",
      userEditId: "",

      action: "",
    }
  }

  async componentDidMount() {
    this.props.getGenderStart() /* -- The redux way */
    this.props.getPositionStart() /* -- The redux way */
    this.props.getRoleStart() /* -- The redux way */
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //render => didupdate
    //hien tai (this) va qua khu (previous)
    //[] [3] => setState

    // [3] [3] => out
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
      })
    }
    if (prevProps.position !== this.props.position) {
      let arrPositions = this.props.position
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].key : "",
      })
    }
    if (prevProps.role !== this.props.role) {
      let arrRoles = this.props.role
      this.setState({
        roleArr: this.props.role,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "",
      })
    }

    if (prevProps.users !== this.props.users) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        position: "",
        gender: "",
        role: "",
        image: "",
        imagePreviewUrl: "",
        action: CRUD_ACTIONS.CREATE,
      })
    }
  }
  handleOnChangeImage = async (e) => {
    let file = e.target.files[0]
    if (file) {
      let base64 = await CommonUtils.getBase64(file)
      let fileUrl = URL.createObjectURL(file)
      this.setState({
        imagePreviewUrl: fileUrl,
        image: base64,
      })
    }
  }

  onChangeInput = (event, id) => {
    let copyState = { ...this.state } // remove

    copyState[id] = event.target.value

    this.setState({
      ...copyState,
    })
  }

  openPreViewImage = () => {
    if (!this.state.imagePreviewUrl) return
    this.setState({ isOpenImage: true })
  }

  checkValidateInput = () => {
    let isValid = true
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ]
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false
        alert("This field is required: " + arrCheck[i])
        break
      }
    }
    return isValid
  }

  handleSaveUser = () => {
    let isValid = this.checkValidateInput()
    if (!isValid) return
    let { action } = this.state

    // console.log("before submit check state  ", this.state)
    if (action === CRUD_ACTIONS.CREATE) {
      //fire redux create user
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        gender: this.state.gender,
        phoneNumber: this.state.phoneNumber,
        roleId: this.state.role,
        positionId: this.state.position,
        image: this.state.image,
      })
    }

    if (action === CRUD_ACTIONS.EDIT) {
      //fire redux edit user
      this.props.editUser({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        gender: this.state.gender,
        phoneNumber: this.state.phoneNumber,
        roleId: this.state.role,
        positionId: this.state.position,
        image: this.state.image,
      })
    }
  }

  handleEditFromChild = (user) => {
    console.log("Check data", user)
    let imageBase64 = ""
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary")
    }
    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      position: user.positionId,
      gender: user.gender,
      role: user.roleId,
      image: "",
      imagePreviewUrl: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    })
  }

  render() {
    let genders = this.state.genderArr
    let positions = this.state.positionArr
    let roles = this.state.roleArr
    let language = this.props.language
    let isLoadingGender = this.props.isLoadingGender
    let isOpenImage = this.state.isOpenImage
    let imagePreviewUrl = this.state.imagePreviewUrl

    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      role,
      position,
    } = this.state

    return (
      <div className="user-redux-conatainer">
        <div className="title">User Redux Container</div>

        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {isLoadingGender === true ? "Loading Gender" : ""}
              </div>
              <div className="col-12">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    this.onChangeInput(event, "email")
                  }}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    this.onChangeInput(event, "password")
                  }}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.firstName" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={firstName}
                  onChange={(event) => {
                    this.onChangeInput(event, "firstName")
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.lastName" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={lastName}
                  onChange={(event) => {
                    this.onChangeInput(event, "lastName")
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phone" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(event) => {
                    this.onChangeInput(event, "phoneNumber")
                  }}
                />
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(event) => {
                    this.onChangeInput(event, "address")
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  name="gender"
                  className="form-select"
                  onChange={(event) => {
                    this.onChangeInput(event, "gender")
                  }}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      )
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.roleId" />
                </label>
                <select
                  name="role"
                  className="form-select"
                  onChange={(event) => {
                    this.onChangeInput(event, "role")
                  }}
                  value={role}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      )
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  name="position"
                  className="form-select"
                  onChange={(event) => {
                    this.onChangeInput(event, "position")
                  }}
                  value={position}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      )
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(e) => this.handleOnChangeImage(e)}
                  />
                  <label className="label-upload" htmlFor="previewImg">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>

                  <div
                    className="preview-img col-3"
                    style={{
                      backgroundImage: `url(${imagePreviewUrl})`,
                    }}
                    onClick={() => this.openPreViewImage()}
                  ></div>
                </div>
              </div>
              <div className="col-12 my-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning px-2"
                      : "btn btn-primary px-2"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.submit" />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManagerUser
                  handleEditFromChild={this.handleEditFromChild}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>

        {isOpenImage && (
          <Lightbox
            mainSrc={imagePreviewUrl}
            onCloseRequest={() => this.setState({ isOpenImage: false })}
          />
        )}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    editUser: (userData) => dispatch(actions.editUserStart(userData)),
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    position: state.admin.positions,
    role: state.admin.roles,
    users: state.admin.users,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)
