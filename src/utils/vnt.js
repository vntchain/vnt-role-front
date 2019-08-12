import VNT from 'vnt'
import abi from './abi.json'
import { message, Modal } from 'antd'

let rpcObj = {}

const vnt = new VNT()

const contract = vnt.core.contract(abi);

const fetchPromise = (method, params) => {
  return new Promise(resolve => {
    fetch(rpcObj.url, {
      method: 'post',
      headers: new Headers({
          'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: method,
        params: params || [],
        id: 1
      })
    }).then(res => {
      return res.json()
    })
    .catch(error => message.error(error.message))
    .then(response => resolve(response))
  }) 
}

const createCorePromise = (funName, payload, callback) => {
  return new Promise(resolve => {
    try {
      payload ? 
      window.vnt.core[funName](payload, 
        (err, res) => {
          if(err) {
            message.error(err.message)
            return
          }
          callback ? callback() : resolve(res)
        })
      : window.vnt.core[funName]((err, res) => {
          if(err) {
            message.error(err.message)
            return
          }
          callback ? callback() : resolve(res)
        })
    } catch (e) {
      message.error(e.message)
    }
  })
}


const createPromise = (funName) => {
  return new Promise(resolve => {
    try {
      window.vnt[funName]((err, res) => {
        if(err) {
          message.error(err.message)
          return
        }
        resolve(res)
      })
    } catch (e) {
      message.error(e.message)
    }
  })
}

export const getNetworkUrl = callback => {
  // 获取插件网络&监听网络变换
  try {
    window.vnt.getNetworkUrl((err, res) => {
      if(err) {
        message.error(err.message)
        return
      }
      if(res.url) {
        rpcObj= res
        vnt.setProvider(new vnt.providers.HttpProvider(res.url))
        callback()
      }
    })
  } catch (e) {
    message.error(e.message)
  }
}

export const logout = () => {
  return createPromise('logout')
}

export const getAllCandidates = () => {
  return fetchPromise('core_getAllCandidates')
}

//获取地址
export const getAccounts = callback => {
  try {
    window.vnt.core.getAccounts((err, res) => {
      if(err) {
        message.error(err.message)
        return
      }
      callback(res)
    })
  } catch (e) {
    message.error(e.message)
  }
}

//获取余额
export const getBalance = addr => {
  return fetchPromise('core_getBalance', [addr, 'latest'])
}

//发送交易
export const sendTx = async (payload, callback) => {
  const { funcName, inputData, addr } = payload
  const data = await inputData ? contract.packFunctionData(funcName, inputData) : contract.packFunctionData(funcName)
  const tx = {
    from: addr,
    to: '0x0000000000000000000000000000000000000009',
    data: data,
    value: funcName == '$bindCandidate' ? 1e25 : 0
  }
  const gasPrice = await getGasPrice().then(res => res.toString(10))
  const gas = await getGas(tx).then(res => res.toString(10))
  //确认发送交易提醒
  Modal.info({
    title: '请确认操作',
    content: '请在打开的VNT Wallet中签名确认！',
  })
  try {
    window.vnt.core.sendTransaction({
      ...tx,
      gasPrice,
      gas
    }, callback)
  } catch (e) {
    message.error(e.message)
  }
}

// 估算油价
const getGasPrice = () => {
  return createCorePromise('getGasPrice')
}
// 估算耗油量
const getGas = tx => {
  return createCorePromise('estimateGas', tx)
}


export const toDecimal = vnt.toDecimal