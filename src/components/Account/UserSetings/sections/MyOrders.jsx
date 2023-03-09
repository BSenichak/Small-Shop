import React from 'react'
import { connect } from 'react-redux'

export const MyOrders = (props) => {
  return (
    <div>
      <h1>In the development</h1>
      <img src="/image/development.svg" alt="development" style={{width: "50%", margin: "2rem auto"}}/>
    </div>
  )
}


export default connect()(MyOrders)