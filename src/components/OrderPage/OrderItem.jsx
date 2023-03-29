import React from 'react'
import { connect } from 'react-redux'
import s from "./OrderPage.module.css"

export const OrderItem = (props) => {
  return (
    <div className={s.itemWrapper}>{props.data.name} ${props.data.price}</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem)