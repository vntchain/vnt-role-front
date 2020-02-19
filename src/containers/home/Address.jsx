import React from 'react'
import { withLang } from '@translate'
import imgs from '../../utils/imgs'
import './Address.scss'

import Copier from '../../components/Copier'

export default withLang(function Address(props){
  const copyRef = React.createRef()
  const { addr, localText } = props
  return (
    <div className="address">
      <img className="icon" src={imgs.iconWallet} alt="wallet"/>
      <span>
        {localText.home_address}
      </span>
      <span>{addr}</span>
      <Copier text={addr} ref={copyRef} sucessTip={localText.copy_sucess}>
        <a href="javascript:">
          {localText.home_copy}
        </a>
      </Copier>
    </div>
  )
})
