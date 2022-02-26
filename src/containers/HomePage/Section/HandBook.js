import React, { Component } from "react"
import { connect } from "react-redux"
import "./HandBook.scss"
import { FormattedMessage } from "react-intl"

import Slider from "react-slick"

class HandBook extends Component {
  render() {
    const settings = { ...this.props.settings }
    settings.slidesToShow = 2

    return (
      <div className="section-container section-handbook">
        <div className="section-title">Cẩm nang</div>
        <Slider {...settings} className="section-content">
          {this.props.dataHandBook.map((item, index) => {
            return (
              <div className="section-content-card" key={index}>
                <div className="handbook-img">
                  <img src={item.url} alt="hero_img" />
                </div>

                <div className="card-name">
                  <h3>{item.name}</h3>
                </div>
              </div>
            )
          })}
        </Slider>
        <button className="section-more">Tất cả bài viết</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook)
