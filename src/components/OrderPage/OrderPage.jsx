import React from 'react'
import { connect } from 'react-redux'
import s from "./OrderPage.module.css"

export const OrderPage = (props) => {
  return (
    <div className={s.wrapper}>OrderPage</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)