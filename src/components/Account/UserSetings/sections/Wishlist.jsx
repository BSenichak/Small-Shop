import React from 'react'
import { connect } from 'react-redux'

export const Wishlist = (props) => {
  return (
    <div>
      <h1>in the development</h1>
      <img src="/image/development.svg" alt="development" style={{width: "50%", margin: "2rem auto"}}/>
    </div>
  )
}


export default connect()(Wishlist)