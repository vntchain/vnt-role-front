import React from 'react'
import './NotLocker.scss'
import pic_no from '../../assets/images/pic_no.png'

export default function NotLocker() {
  return (
    <div className="notLocker">
      <img src={pic_no} alt="pic_no"/>
      <p>您还未被指定为锁仓人，请先注册超级节点！</p>
      <a href="" target="_blank">如何加入VNT网络？</a>
    </div>
  )
}