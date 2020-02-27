import React, { Fragment, useState, useEffect } from 'react'
import Copier from '../../components/Copier'
import { message } from 'antd'
import { Modal, Button } from 'antd'
import { getBalance, toDecimal, sendTx } from '../../utils/vnt'
import { UpperCase } from '../../utils/helpers'
import { withLang } from '@translate'

import './Item.scss'

export default withLang(function Item(props) {
  const copyRef = React.createRef()
  const {
    candidate: {
      name,
      owner,
      beneficiary,
      bind
    },
    addr,
    getCandidates,
    localText
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
        title: localText.send_title,
        content: localText.send_message
      })
      //获取到txId后监听交易变化
      getTransactionReceipt(txId, receipt =>{
        if (receipt.status == '0x1') {
          //交易成功
          Modal.destroyAll()
          Modal.info({
            title: localText.send_sucess_title,
            content: localText.send_sucess_message
          })
          //清空绑定输入框
          setBindCandidate('')
          setBindBeneficiary('')
        } else {
          //交易失败
          Modal.destroyAll()
          Modal.info({
            title: localText.send_error_title,
            content: localText.send_error_message
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
        title: localText.send_reject_title,
        content: localText.send_reject_message
      })
    } else {
      setTxId(res)
      //todo: loading时机
      // setIsItemLoading(true)
    }
  }
  const handleUnBind = () => {
    Modal.confirm({
      title: localText.unbind_title,
      content: localText.unbind_message,
      onOk(){
        sendTx({
          funcName: 'unbindCandidate',
          inputData: [owner, beneficiary],
          addr,
          localText
        }, sendTxCallback)
      },
      onCancel(){}
    })
  }
  const handleBind = () => {
    if (UpperCase(bindCandidate) != UpperCase(owner) || UpperCase(bindBeneficiary) != UpperCase(beneficiary)) {
      message.info(localText.bind_info_error)
      return
    }
    // 判断金额是否大于1000w vnt
    getBalance(addr).then(res => {
      if(toDecimal(res.result) > 10000000){
        sendTx({
          funcName: '$bindCandidate',
          inputData: [bindCandidate, bindBeneficiary],
          addr,
          localText
        }, sendTxCallback)
        // bindCandidate({ ...bindData, addr }, sendTxCallback) 
      } else {
        message.info(localText.bind_vnt_error)
      }
    })
  }
  return (
    <div className="super-item">
      <div>
        <p className="super-item__status">
          {bind ? localText.node_status_lock : localText.node_status_notlock}
        </p>
        <p className="super-item__cont">
          <label>{localText.node_name}</label>
          <span>{name}</span>
        </p>
        <p className="super-item__cont">
          <label>{localText.node_address}</label>
          <span>{owner}</span>
          <Copier ref={copyRef} text={owner} sucessTip={localText.copy_sucess}>
            <a href="javascript:">{localText.node_copy}</a>
          </Copier>
        </p>
        {bind ? (
          //已锁仓
          <p className="super-item__cont">
            <label>{localText.node_benifit}</label>
            <span>{beneficiary}</span>
          </p>
        ) : (
          //未锁仓
          <Fragment>
            <p className="super-item__cont">
              <label>{localText.node_address}</label>
              <input
                type="text"
                placeholder={localText.node_address_placeholder}
                value={bindCandidate}
                onChange={val => setBindCandidate(val.target.value)}
              />
            </p>
            <p className="super-item__cont">
              <label>{localText.node_benifit}</label>
              <input
                type="text"
                placeholder={localText.node_benifit_placeholder}
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
            {localText.node_lock_quit}
          </Button>
        ) : (
          // {/* 未锁仓 */}
          <Button
            type="primary"
            // loading={isItemLoading}
            className="super-item__button super-item__button-green"
            onClick={handleBind}
          >
            {localText.node_lock_button}
          </Button>
        )
      }
    </div>
  )
})
