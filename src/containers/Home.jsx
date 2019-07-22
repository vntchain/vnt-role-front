import React, { useState } from 'react'

import Header from '../components/layout/Header'
import Banner from '../components/layout/Banner'

import Address from './home/Address'
import NotLocker from './home/NotLocker'
import Item from './home/Item'
import Modal from '../components/Modal'

import './Home.scss'
import bannerImg from '../assets/images/pic_banner.png'

export default function Home(){
  const [isQuitVisible, setIsQuitVisible] = useState(false)
  const handleQuit = () => {}
  const handleClose = () => {
    setIsQuitVisible(false)
  }
  const handleShowQuit = () => {
    setIsQuitVisible(true)
  }
  // const handleShowLock = () => {

  // }
  return (
    <div>
      <Header />
      <Banner title="VNT超级节点锁仓" image={bannerImg} />
      <Address />
      <NotLocker />
      <div className="super-list">
        <Item onButtonClick={res => handleShowQuit(res)} />
      </div>
      <Modal visible={isQuitVisible} okText="退出锁仓" onCancel={handleClose} onOk={handleQuit} />
    </div>
  )
}