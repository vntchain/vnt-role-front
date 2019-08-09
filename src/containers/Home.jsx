import React, { useState, useEffect } from 'react'

import Header from '../components/layout/Header'
import Banner from '../components/layout/Banner'

import Address from './home/Address'
import NotLocker from './home/NotLocker'
import Item from './home/Item'
import { getAllCandidates, getCoinbase } from '../utils/vnt'
import { UpperCase } from '../utils/helpers'

import './Home.scss'
import bannerImg from '../assets/images/pic_banner.png'

export default function Home(){
  const [addr, setAddr] = useState('')
  const [candidates, setCandidates] = useState([])
  const [allCandidates, setAllCandidates] = useState([])
  useEffect(() => {
    getCoinbase().then(res => setAddr(res[0]))
    getCandidates()
  },[])
  useEffect(() => {
    if(addr && allCandidates.length) {
      setCandidates(allCandidates.filter(item => UpperCase(item.binder) == UpperCase(addr)))
    }
  }, [addr, allCandidates])
  const getCandidates = () => {
    getAllCandidates().then(res => {
      if (res) {
        const result = res.result||[]
        setAllCandidates(result)
      }
    })
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
                getCandidates={getCandidates}
              />
            ))
          }
        </div>
      ) : <NotLocker />}
    </div>
  )
}