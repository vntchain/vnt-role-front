import React from 'react'
import { FormattedMessage } from '@translate'
import './NotLocker.scss'
import pic_no from '../../assets/images/pic_no.png'

export default function NotLocker() {
  return (
    <div className="notLocker">
      <img src={pic_no} alt="pic_no"/>
      <p>
        <FormattedMessage id="notLocker_tip" plain={true} />
      </p>
      <a href="https://scan.vntchain.io/developer/join" target="_blank" rel="noopener noreferrer">
        <FormattedMessage id="notLocker_join" plain={true} />
      </a>
    </div>
  )
}
