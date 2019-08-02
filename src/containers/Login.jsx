import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import paths from '../utils/paths'
import imgs from '../utils/imgs'
import { message } from 'antd'
import './Login.scss'

import { Consumer } from '../components/Context'

export default Consumer(function Login(props){
  console.log(props)//eslint-disable-line
  const { history, setIsLogin } = props
  const [isDisabled, setIsDisabled] = useState(false)
  const handleLogin = () => {
    if (typeof window.vnt !== 'undefined') {
      window.vnt.requestAuthorization((err, result) => {
        if (err) {
          console.log(err)//eslint-disable-line
          message.error(err)
        }
        if (result) {
          // localStorage.setItem('ROLE_IS_LOGIN', 'true')
          setIsLogin(true)
          history.push(paths.home)
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
        <Link className="login__container__download" to={paths.download}>下载VNT Wallet</Link>
      </div>
    </div>
  )
})