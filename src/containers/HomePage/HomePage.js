import React, { Component } from "react"
import { connect } from "react-redux"
import HomeHeader from "./HomeHeader"
import HomeFooter from "./HomeFooter"
import "./HomePage.scss"
import * as actions from "../../store/actions"

import {
  Specialty,
  MedicalFacility,
  OutstandingDoctor,
  HandBook,
  About,
} from "./Section"

import {
  dataSpecialty,
  dataFacility,
  dataDoctor,
  dataHandBook,
} from "./Section/dataSection"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import LeftArrow from "../../assets/left-arrow.svg"
import RightArrow from "../../assets/right-arrow.svg"

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <img src={LeftArrow} alt="prevArrow" {...props} />
)

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <img src={RightArrow} alt="nextArrow" {...props} />
)

class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      prevArrow: <SlickArrowLeft />,
      nextArrow: <SlickArrowRight />,
    }

    // arrDoctors = Object.values(arrDoctors)

    return (
      <div>
        <HomeHeader />
        <Specialty settings={settings} specialty={dataSpecialty} />
        <MedicalFacility settings={settings} medicalFacility={dataFacility} />

        <OutstandingDoctor settings={settings} doctor={dataDoctor} />
        <HandBook settings={settings} dataHandBook={dataHandBook} />
        <About />
        <HomeFooter />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
