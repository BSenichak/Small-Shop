import React from 'react'
import { connect } from 'react-redux'
import s from "../AdminOrders.module.scss"

export const AdminStartOrders = (props) => {
  return (
    <div className={s.itemWrapper}>AdminStartOrders</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch =>{
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminStartOrders)