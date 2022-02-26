import React, { Component } from "react"
import { connect } from "react-redux"
import "./MedicalFacility.scss"
import { FormattedMessage } from "react-intl"

import Slider from "react-slick"

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-container section-facility ">
        <div className="section-title">Cơ sở y tế nổi bật</div>
        <Slider {...this.props.settings} className="section-content">
          {this.props.medicalFacility.map((item, index) => {
            return (
              <div className="section-content-card" key={index}>
                <img src={item.url} alt="hero_img" />

                <div className="section-content-date-time">
                  <img src="https://www.wanderon.in/svg/clock.svg" alt="time" />
                  <p className="card-location">1D-2D</p>

                  <img
                    src="https://www.wanderon.in/svg/map-pin.svg"
                    alt="location"
                    style={{ marginLeft: 10 }}
                  />
                  <p className="card-location">Viet Nam</p>
                </div>
                <h3 className="card-name">{item.name}</h3>
              </div>
            )
          })}
        </Slider>
        <button className="section-more">Xem thêm</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
