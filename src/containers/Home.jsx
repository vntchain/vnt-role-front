import React, { useState, useEffect } from 'react'

import Header from '../components/layout/Header'
import Banner from '../components/layout/Banner'

import Address from './home/Address'
import NotLocker from './home/NotLocker'
import Item from './home/Item'
import Modal from '../components/Modal'
import { getAllCandidates, getCoinbase, unBindCandidate } from '../utils/vnt'
import { UpperCase } from '../utils/helpers'

import './Home.scss'
import bannerImg from '../assets/images/pic_banner.png'

export default function Home(props){
  console.log('home',props) //eslint-disable-line
  // const { isQuitModalVisible, setIsQuitModalVisible } = props
  const [addr, setAddr] = useState('')
  const [candidates, setCandidates] = useState([])
  const [allCandidates, setAllCandidates] = useState([])
  const [isQuitModalVisible, setIsQuitModalVisible] = useState(false)
  const [bindObj, setBindObj] = useState({})
  useEffect(() => {
    getCoinbase().then(res => setAddr(res[0]))
    getAllCandidates().then(res => {
      if (res) {
        const result = res.result||[]
        setAllCandidates(result)
      }
    })
  },[])
  useEffect(() => {
    console.log(addr, allCandidates) //eslint-disable-line
    if(addr && allCandidates.length) {
      setCandidates(allCandidates.filter(item => UpperCase(item.binder) == UpperCase(addr)))
    }
  }, [addr, allCandidates])
  const handleQuit = () => {
    unBindCandidate(bindObj)
  }
  return (
    <div>
      <Header />
      <Banner title="VNT超级节点锁仓" image={bannerImg} />
      <Address addr={addr} />
      {candidates.length ? (
        <div className="super-list">
          {
            candidates.map((candidate, ind) => (
              <Item
                key={ind}
                candidate={candidate}
                addr={addr}
                setIsQuitModalVisible={setIsQuitModalVisible}
                setBindObj={setBindObj}
              />
            ))
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
}