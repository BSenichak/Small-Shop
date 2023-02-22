import React from 'react'
import { connect } from 'react-redux'
import s from "./NotFound.module.css"

export const NotFound = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.first}>404</div>
      <div className={s.second}>NOT FOUND</div>
    </div>
  )
}

export default connect()(NotFound)