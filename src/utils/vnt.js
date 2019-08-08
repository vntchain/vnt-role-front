import VNT from 'vnt'
import abi from './abi.json'
import { message } from 'antd'

let rpcObj = {
  url: process.env.REACT_APP_RPC
}

const vnt = new VNT()
console.log(rpcObj.url) //eslint-disable-line
vnt.setProvider(new vnt.providers.HttpProvider(rpcObj.url))

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

const createCorePromise = (funName, payload) => {
  return new Promise(resolve => {
    try {
      payload ? 
      vnt.core[funName](payload, 
        (err, res) => {
          if(err) {
            message.error(err.message)
            return
          }
          console.log(res) //eslint-disable-line
          resolve(res)
        })
      : vnt.core[funName]((err, res) => {
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

export const getNetworkUrl = () => {
  // 获取插件网络&监听网络变换
  // try {
  //   window.vnt['getNetworkUrl']((err, res) => {
  //     if(err) {
  //       message.error(err)
  //       return
  //     }
  //     console.log(res) //eslint-disable-line
  //     rpcObj= res
        // vnt.setProvider(new vnt.providers.HttpProvider(res.url))
  //   })
  // } catch (e) {
  //   message.error(e.message)
  // }
}

export const logout = () => {
  return createPromise('logout')
}

export const getAllCandidates = () => {
  return fetchPromise('core_getAllCandidates')
  // return Promise.resolve({result:[
  //   {
  //       "owner": "0x122369F04f32269598789998de33e3d56E2C507a",
  //       "name": "node0",
  //       "registered": true,
  //       "website": "www.node0.com",
  //       "url": "/ip4/127.0.0.1/tcp/5210/ipfs/1kHcch6yuBCgC5nPPSK3Yp7Es4c4eenxAeK167pYwUvNjRo",
  //       "voteCount": "0xaef33",
  //       "binder": "0x34cc5438c9ae5f46aba04d3edccea8c37b1886b6",
  //       "beneficiary": "0x0000000000000000000000000000000000000003",
  //       "bind": true
  //   },
  //   {
  //       "owner": "0x3DcF0b3787C31B2bdF62d5bC9128A79c2bb18829",
  //       "name": "node1",
  //       "registered": true,
  //       "website": "www.node1.com",
  //       "url": "/ip4/127.0.0.1/tcp/5211/ipfs/1kHJFKr2bzUnMr1NbeyYbYJa3RXT18cEu7cNDrHWjg8XYKB",
  //       "voteCount": "0xaef33",
  //       "binder": "0x34cc5438c9ae5f46aba04d3edccea8c37b1886b6",
  //       "beneficiary": "0x0000000000000000000000000000000000000004",
  //       "bind": false
  //   }]})
}

//获取地址
export const getCoinbase = () => {
  return createCorePromise('getAccounts')
}

//获取余额
export const getBalance = addr => {
  return fetchPromise('core_getBalance', [addr, 'latest'])
}

export const bindCandidate = (payload, callback) => {
  try {
    const { candidate, beneficiary, addr } = payload
    const data = contract.$bindCandidate.sendTransaction(candidate,beneficiary,{ from: addr, value:1e25 })
    console.log(data) //eslint-disable-line
    sendTx({...payload, data}, callback)
  } catch (e) {
    message.error(e.message)
  }
}

export const unBindCandidate = (payload, callback) => {
  try {
    const { candidate, beneficiary, addr } = payload
    console.log(candidate, beneficiary, addr) //eslint-disable-line
    const data = contract.unbindCandidate.sendTransaction(candidate,beneficiary,{from: candidate})
    console.log(data) //eslint-disable-line
    sendTx({...payload, data}, callback)
  }  catch (e) {
    console.log('error', e) //eslint-disable-line
    message.error(e.message)
  }
}

//发送交易
export const sendTx = async (payload, callback) => {
  const { funcName, inputData, addr } = payload
  console.log(inputData) //eslint-disable-line
  const data = await inputData ? contract.packFunctionData(funcName, inputData) : contract.packFunctionData(funcName)
  const tx = {
    from: addr,
    to: '0x0000000000000000000000000000000000000009',
    data: data,
    value: 1e25
  }
  const gasPrice = await getGasPrice().then(res => res.toString(10))
  const gas = await getGas(tx).then(res => res.toString(10))
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