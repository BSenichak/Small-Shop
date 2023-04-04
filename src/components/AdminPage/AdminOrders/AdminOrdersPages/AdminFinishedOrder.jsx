import React from 'react'
import { connect } from 'react-redux'
import s from "../AdminOrders.module.scss"

export const AdminFinishedOrder = (props) => {
  return (
    <div className={s.itemWrapper}>AdminFinishedOrder</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch =>{
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminFinishedOrder)