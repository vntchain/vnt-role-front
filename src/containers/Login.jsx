import React from 'react'
import { Link } from 'react-router-dom'
import paths from '../utils/paths'
import imgs from '../utils/imgs'
import "./Login.scss"

export default function Login(){
  const handleLogin = () => {}
  return (
    <div className="login">
      <header className="login__head">
        <img src={imgs.logoWhite} alt="logo"/>
      </header>
      <div className="login__container">
        <div className="login__container__bg" />
        <h2 className="login__container__title">VNT超级节点锁仓</h2>
        <a className="login__container__login" href="javascript:;" onClick={handleLogin}>登录VNT Wallet</a>
        <Link className="login__container__download" to={paths.download}>下载VNT Wallet</Link>
      </div>
    </div>
  )
}