import React, { useState, useEffect } from 'react'

import Header from '../components/layout/Header'
import Banner from '../components/layout/Banner'

import Address from './home/Address'
import NotLocker from './home/NotLocker'
import Item from './home/Item'
import Modal from '../components/Modal'
import { getAllCandidates, getCoinbase } from '../utils/vnt'
import { Consumer } from '../components/Context'

import './Home.scss'
import bannerImg from '../assets/images/pic_banner.png'

export default Consumer(function Home(props){
  console.log('home',props) //eslint-disable-line
  const { isQuitModalVisible, setIsQuitModalVisible } = props
  const [addr, setAddr] = useState('')
  const [candidates, setCandidates] = useState([])
  const [allCandidates, setAllCandidates] = useState([])
  useEffect(() => {
    getCoinbase().then(res => setAddr(res))
    getAllCandidates().then(res => {
      console.log('getAllCandidates', res) //eslint-disable-line
      if (res) {
        const result = res.result||[]
        setAllCandidates(result)
      }
    })
  },[])
  useEffect(() => {
    if(addr && allCandidates.length) {
      setCandidates(allCandidates.filter(item => item.binder == addr))
    }
  }, [addr, allCandidates])
  const handleQuit = () => {}
  return (
    <div>
      <Header />
      <Banner title="VNT超级节点锁仓" image={bannerImg} />
      <Address addr={addr} />
      {candidates.length ? (
        <div className="super-list">
          {
            candidates.map((candidate, ind) => <Item key={ind} candidate={candidate} addr={addr} />)
          }
        </div>
      ) : <NotLocker />}
      <Modal
        visible={isQuitModalVisible}
        okText="退出锁仓"
        onCancel={() => setIsQuitModalVisible(false)}
        onOk={handleQuit}
      >
        <p>退出锁仓将注销超级节点，不再获取出块奖励</p>
      </Modal>
    </div>
  )
})