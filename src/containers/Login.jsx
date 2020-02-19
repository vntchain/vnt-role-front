import React, { useState } from 'react'
import paths from '../utils/paths'
import imgs from '../utils/imgs'
import { message } from 'antd'
import './Login.scss'
import { withLang } from '@translate'

import { Consumer } from '../components/Context'

export default Consumer(withLang(function Login(props){
  const { setIsLogin, localText } = props
  const [isDisabled, setIsDisabled] = useState(false)
  const handleLogin = () => {
    if (typeof window.vnt !== 'undefined') {
      window.vnt.requestAuthorization((err, result) => {
        if (err) {
          console.log(err)//eslint-disable-line
          message.error(err.message)
        }
        if (result) {
          // localStorage.setItem('ROLE_IS_LOGIN', 'true')
          //改变登录状态后auth自动跳转home
          setIsLogin(true)
          // history.push(paths.home)
        }
      })
    } else {
      message.info(localText['login_tip'])
      setIsDisabled(true)
    }
  }
  return (
    <div className="login">
      <header className="login__head">
        <img src={imgs.logoWhite} alt="logo"/>
      </header>
      <div className="login__container">
        <div className="login__container__bg" />
        <h2 className="login__container__title">
          {localText['login_title']}
        </h2>
        <button
          className="login__container__login"
          href="javascript:;"
          onClick={handleLogin}
          disabled={isDisabled}
        >
          {localText['login_btn']}
        </button>
        <a
          className="login__container__download"
          href={paths.download}
          target="_blank"
          rel="noopener noreferrer"
        >
          {localText['login_download_btn']}
        </a>
      </div>
    </div>
  )
}))
