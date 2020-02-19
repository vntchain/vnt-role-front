import React, { useState, useEffect } from 'react'
import { FormattedMessage } from '@translate'

import Header from '../components/layout/Header'
import Banner from '../components/layout/Banner'

import Address from './home/Address'
import NotLocker from './home/NotLocker'
import Item from './home/Item'
import { getAllCandidates, getAccounts, listenNetworkUrl } from '../utils/vnt'
import { UpperCase } from '../utils/helpers'

import './Home.scss'
import bannerImg from '../assets/images/pic_banner.png'

export default function Home(){
  const [addr, setAddr] = useState('')
  const [candidates, setCandidates] = useState([])
  const [allCandidates, setAllCandidates] = useState([])
  useEffect(() => {
    getAccounts(res => {
      setAddr(res[0])
      getCandidates()
    })
    listenNetworkUrl(res => {
      if (res.url) {
        getCandidates()
      }
    })
  },[])
  useEffect(() => {
    if(addr) {
      setCandidates(allCandidates.filter(item => UpperCase(item.binder) == UpperCase(addr)))
    }
  }, [addr, allCandidates])
  //获取节点列表
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
      <Banner title={<FormattedMessage id="banner_title" />} image={bannerImg} />
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
