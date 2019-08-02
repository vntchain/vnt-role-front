import React from 'react'
import imgs from '../../utils/imgs'
import './Address.scss'

import Copier from '../../components/Copier'

export default function Address(props){
  const copyRef = React.createRef()
  const { addr } = props
  return (
    <div className="address">
      <img className="icon" src={imgs.iconWallet} alt="wallet"/>
      <span>我的地址：</span>
      <span>{addr}</span>
      <Copier text={addr} ref={copyRef}>
        <a href="javascript:">复制</a>
      </Copier>
    </div>
  )
}