import React from 'react'
import { connect } from 'react-redux'
import s from "./HomePage.module.css"
import Poster from './Poster/Poster'

export const HomePage = (props) => {
  return (
    <div className={s.wrapper}>
      <Poster/>
      sdsdfsd
    </div>
  )
}

export default connect()(HomePage)