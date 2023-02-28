import React from 'react'
import { connect } from 'react-redux'
import s from "./Register.module.css"

export const Register = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.imgBox}>
        <img src="/image/register.svg" alt="" />
      </div>
      <div className={s.formBox}>
        <h2>REGISTRATION</h2>
        <div>NAME:</div>
        <input type="text" className={s.input} />
        <div>SECONDNAME:</div>
        <input type="text" className={s.input} />
        <div>PHONE NUMBER:</div>
        <input type="text" className={s.input} defaultValue={"+380"}/>
        <div>EMAIL:</div>
        <input type="text" className={s.input} />
        <div>PASSWORD:</div>
        <input type="text" className={s.input} />
        <div className={s.btn}>REGISTER AN ACCOUNT</div>
      </div>
    </div>
  )
}

export default connect()(Register)