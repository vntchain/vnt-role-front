import React from 'react'
import imgs from '../../utils/imgs'
import SwitchLanguage from '../SwitchLanguage'
import './Header.scss'

export default function Header(){
  return (
    <header className="header">
      <div className="header__cont">
        <img src={imgs.logoBlue} alt="logo"/>
        <SwitchLanguage />
      </div>
    </header>
  )
}
