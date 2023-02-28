import React from 'react'
import { connect } from 'react-redux'
import s from "./ForgotPassword.module.css"

export const ForgotPassword = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.imgBox}>
        <img src="/image/forgotpassword.svg" alt="" />
      </div>
      <div className={s.formBox}>
        <h2>FORGOT PASSWORD</h2>
        <div>EMAIL:</div>
        <input type="text" className={s.input} />
        <div className={s.btn}>SEND MESSAGE</div>
      </div>
    </div>
  )
}

export default connect()(ForgotPassword)