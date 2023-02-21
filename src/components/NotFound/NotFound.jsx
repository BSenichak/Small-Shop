import React from 'react'
import { connect } from 'react-redux'
import s from "./NotFound.module.css"

export const NotFound = (props) => {
  return (
    <div className={s.wrapper}>NotFound</div>
  )
}

export default connect()(NotFound)