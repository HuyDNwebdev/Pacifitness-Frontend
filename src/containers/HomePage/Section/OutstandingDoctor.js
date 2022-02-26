import React, { Component } from "react"
import { connect } from "react-redux"
import "./OutstandingDoctor.scss"
import { FormattedMessage } from "react-intl"
import * as actions from "../../../store/actions"
import Slider from "react-slick"

class OutstandingDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = { arrDoctors: [] }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({ arrDoctors: this.props.topDoctors })
    }
  }
  componentDidMount() {
    this.props.loadTopDoctors()
  }
  render() {
    let arrDoctors = this.state.arrDoctors
    // console.log(arrDoctors)
    arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
    arrDoctors = Object.values(arrDoctors)
    // console.log(arrDoctors === this.props.doctors)
    return (
      <div className="section-container section-doctor ">
        <div className="section-title">Bác sĩ nổi bật tuần qua</div>
        <Slider {...this.props.settings} className="section-content">
          {arrDoctors &&
            this.props.topDoctors.map((item, index) => {
              console.log(item)
              return (
                <div className="section-content-card" key={index}>
                  <img
                    className="doctor-image"
                    src={
                      "https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg"
                    }
                    alt="hero_img"
                  />

                  <div className="section-content-date-time">
                    <img
                      src="https://www.wanderon.in/svg/map-pin.svg"
                      alt="location"
                      // style={{ marginLeft: "80px", marginTop: "10px" }}
                      className="icon-location"
                    />

                    <p className="card-location">Viet Nam</p>
                  </div>
                  <div className="card-name">
                    <div className="name">Giáo sư tiến sĩ HuyDN</div>
                    <div className="field">Cơ Xương Khớp</div>
                  </div>
                </div>
              )
            })}
        </Slider>
        <button className="section-more">tìm kiếm</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctors: state.admin.topDoctors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
