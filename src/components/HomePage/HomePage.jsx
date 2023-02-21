import React from 'react'
import { connect } from 'react-redux'
import Categories from './Categories/Categories'
import s from "./HomePage.module.css"
import Poster from './Poster/Poster'

export const HomePage = (props) => {
  return (
    <div className={s.wrapper}>
      <Poster/>
      <Categories/>
    </div>
  )
}

export default connect()(HomePage)