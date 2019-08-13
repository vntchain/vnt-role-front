import React, { Fragment, useState, useEffect } from 'react'
import Copier from '../../components/Copier'
import { message } from 'antd'
import { Modal, Button } from 'antd'
import { getBalance, toDecimal, sendTx } from '../../utils/vnt'
import { UpperCase } from '../../utils/helpers'

import './Item.scss'

export default function Item(props) {
  const copyRef = React.createRef()
  const {
    candidate: {
      name,
      owner,
      beneficiary,
      bind
    },
    addr,
    getCandidates
  } = props
  const [bindCandidate, setBindCandidate] = useState('')
  const [bindBeneficiary, setBindBeneficiary] = useState('')
  // const [isItemLoading, setIsItemLoading] = useState(false)
  const [txId, setTxId] = useState('')
  useEffect(() => {
    if(txId){
      //提示交易发送中
      Modal.destroyAll()
      Modal.info({
        title: '正在发送...',
        content: '正在向链上发送交易，请耐心等待...'
      })
      //获取到txId后监听交易变化
      getTransactionReceipt(txId, receipt =>{
        if (receipt.status == '0x1') {
          //交易成功
          Modal.destroyAll()
          Modal.info({
            title: '成功了！',
            content: '您的交易发送成功！'
          })
          //清空绑定输入框
          setBindCandidate('')
          setBindBeneficiary('')
        } else {
          //交易失败
          Modal.destroyAll()
          Modal.info({
            title: '失败了',
            content: '您的交易失败了！'
          })
        }
        // setIsItemLoading(false)
        //获取超级节点列表
        getCandidates()
      })
    }
  }, [txId])
  let timer
  const getTransactionReceipt = (tx, cb) => {
    window.vnt.core.getTransactionReceipt(tx, (err, receipt) => {
      if (!receipt) {
        timer = setTimeout(function() {
          getTransactionReceipt(tx, cb)
        }, 2000)
      } else {
        clearTimeout(timer.current)
        cb(receipt)
      }
    })
  }
  const sendTxCallback = (err, res) => {
    console.log(err,res) //eslint-disable-line
    if (err) {
      Modal.destroyAll()
      //确认发送交易提醒
      Modal.info({
        title: '失败了',
        content: '您在VNT Wallet中拒绝了这次签名请求！'
      })
    } else {
      setTxId(res)
      //todo: loading时机
      // setIsItemLoading(true)
    }
  }
  const handleUnBind = () => {
    Modal.confirm({
      title: '确认退出？',
      content: '退出锁仓将注销超级节点，不再获取出块奖励',
      onOk(){
        sendTx({
          funcName: 'unbindCandidate',
          inputData: [owner, beneficiary],
          addr
        }, sendTxCallback)
      },
      onCancel(){}
    })
  }
  const handleBind = () => {
    if (UpperCase(bindCandidate) != UpperCase(owner) || UpperCase(bindBeneficiary) != UpperCase(beneficiary)) {
      message.info('信息不匹配！')
      return
    }
    // 判断金额是否大于1000w vnt
    getBalance(addr).then(res => {
      if(toDecimal(res.result) > 10000000){
        sendTx({
          funcName: '$bindCandidate',
          inputData: [bindCandidate, bindBeneficiary],
          addr
        }, sendTxCallback)
        // bindCandidate({ ...bindData, addr }, sendTxCallback)
      } else {
        message.info('账户余额不足1000000 vnt！')
      }
    })
  }
  return (
    <div className="super-item">
      <div>
        <p className="super-item__status">{bind ? '已锁仓' : '未锁仓'}</p>
        <p className="super-item__cont">
          <label>节点名称：</label>
          <span>{name}</span>
        </p>
        <p className="super-item__cont">
          <label>节点地址：</label>
          <span>{owner}</span>
          <Copier ref={copyRef} text={owner}>
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
                value={bindCandidate}
                onChange={val => setBindCandidate(val.target.value)}
              />
            </p>
            <p className="super-item__cont">
              <label>受益人：</label>
              <input
                type="text"
                placeholder="请输入受益人地址"
                value={bindBeneficiary}
                onChange={val => setBindBeneficiary(val.target.value)}
              />
            </p>
          </Fragment>
        )}
      </div>
      {
        bind ? (
          // {/* 已锁仓 */}
          <Button
            type="primary"
            // loading={isItemLoading}
            className="super-item__button super-item__button-blue"
            onClick={handleUnBind}
          >
            退出锁仓
          </Button>
        ) : (
          // {/* 未锁仓 */}
          <Button
            type="primary"
            // loading={isItemLoading}
            className="super-item__button super-item__button-green"
            onClick={handleBind}
          >
            锁仓1000万 VNT
          </Button>
        )
      }
    </div>
  )
}