import React from 'react'
import imgs from '../../utils/imgs'
import './Address.scss'

import Copier from '../../components/Copier'

export default function Address(){
  const copyRef = React.createRef()
  return (
    <div className="address">
      <img className="icon" src={imgs.iconWallet} alt="wallet"/>
      <span>我的地址：</span>
      <span>11111</span>
      <Copier text={`1111`} ref={copyRef}>
        <a href="javascript:">复制</a>
      </Copier>
    </div>
  )
}