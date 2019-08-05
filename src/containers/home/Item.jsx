import React, { Fragment, useState } from 'react'
import Copier from '../../components/Copier'
import { Consumer } from '../../components/Context'
import { message } from 'antd'
import { Modal } from 'antd'
import { getBalance, toDecimal, bindCandidate } from '../../utils/vnt'

import './Item.scss'

export default Consumer(function Item(props) {
  const copyRef = React.createRef()
  const {
    candidate: {
      name,
      binder,
      beneficiary,
      bind
    },
    setIsQuitModalVisible,
    // setIsBindModalVisible,
    setBindObj,
    addr
  } = props
  const defaultBindData = {
    candidate: binder,
    beneficiary: beneficiary
  }
  const [bindData, setBindData] = useState(defaultBindData)
  const handleQuit = () => {
    setIsQuitModalVisible(true)
    setBindObj(bindData)
  }
  const handleBind = () => {
    if (bindData.candidate != binder || bindData.beneficiary != beneficiary) {
      message.info('信息不匹配！')
      return
    }
    // 判断金额是否大于100w vnt
    getBalance(addr).then(res => {
      // if(toDecimal(res.result) > 1000000){
      console.log(toDecimal(res.result)) //eslint-disable-line
      if(toDecimal(res.result) == 0){
        bindCandidate({
          candidate: binder,
          beneficiary,
          addr
        }, () => {
          //确认发送交易
          Modal.info({
            title: '请确认操作',
            content: (
              <p>请在打开的VNT Wallet中签名确认！</p>
            ),
            onOk() {},
          })
        })
      } else {
        message.info('账户余额不足1000000 vnt！')
      }
    })
  }
  return (
    <div className="super-item">
      <div>
        <p className="super-item__status">已锁仓</p>
        <p className="super-item__cont">
          <label>节点名称：</label>
          <span>{name}</span>
        </p>
        <p className="super-item__cont">
          <label>节点地址：</label>
          <span>{binder}</span>
          <Copier ref={copyRef} text={binder}>
            <a href="javascript:">复制</a>
          </Copier>
        </p>
        {bind ? (
          //已锁仓
          <p className="super-item__cont">
            <label>受益人：</label>
            <span>{beneficiary}</span>
          </p>
        ) : (
          //未锁仓
          <Fragment>
            <p className="super-item__cont">
              <label>节点地址：</label>
              <input
                type="text"
                placeholder="请确认节点地址"
                value={bindData.candidate}
                onChange={val => setBindData({ ...bindData, candidate: val.target.value })}
              />
            </p>
            <p className="super-item__cont">
              <label>受益人：</label>
              <input
                type="text"
                placeholder="请输入受益人地址"
                value={bindData.beneficiary}
                onChange={val => setBindData({ ...bindData, beneficiary: val.target.value })}
              />
            </p>
          </Fragment>
        )}
      </div>
      {
        bind ? (
          // {/* 已锁仓 */}
          <a
            href="javascript:"
            className="super-item__button super-item__button-blue"
            onClick={handleQuit}
          >
            退出锁仓
          </a>
        ) : (
          // {/* 未锁仓 */}
          <a
            href="javascript:"
            className="super-item__button super-item__button-green"
            onClick={handleBind}
          >
            锁仓1000万 VNT
          </a>
        )
      }
    </div>
  )
})