import React, { useState } from 'react'
import paths from '../utils/paths'
import imgs from '../utils/imgs'
import { message } from 'antd'
import './Login.scss'

import { Consumer } from '../components/Context'

export default Consumer(function Login(props){
  const { setIsLogin } = props
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
      message.info('请确认是否已经安装了钱包插件！')
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
        <h2 className="login__container__title">VNT超级节点锁仓</h2>
        <button
          className="login__container__login"
          href="javascript:;"
          onClick={handleLogin}
          disabled={isDisabled}
        >
          登录VNT Wallet
        </button>
        <a
          className="login__container__download"
          href={paths.download}
          target="_blank"
          rel="noopener noreferrer"
        >
          下载VNT Wallet
        </a>
      </div>
    </div>
  )
})