import React from 'react'
import { connect } from 'react-redux'
import s from "./Footer.module.css"

export const Footer = (props) => {
  return (
    <footer className={s.footer}>&copy; Senychak Bohdan</footer>
  )
}

export default connect()(Footer)