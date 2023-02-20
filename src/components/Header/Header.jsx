import React from 'react'
import { connect } from 'react-redux'
import s from "./Header.module.css"

export const Header = (props) => {
  return (
    <header className={s.header}>Header</header>
  )
}


export default connect()(Header)