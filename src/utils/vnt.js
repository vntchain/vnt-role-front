import VNT from 'vnt'
import abi from './abi.json'
import { message } from 'antd'

const rpc = process.env.REACT_APP_RPC

const vnt = new VNT()

vnt.setProvider(new vnt.providers.HttpProvider(rpc))

const voteContract = vnt.core.contract(abi).at("0x0000000000000000000000000000000000000009");

// const initFetch = (method, params) => {
//   return {
//     method: 'post',
//     headers: new Headers({
//         'Content-Type': 'application/json',
//     }),
//     body: JSON.stringify({
//       jsonrpc: '2.0',
//       method: method,
//       params: params || [],
//       id: 1
//     })
//   }
// }

export const getAllCandidates = () => {
  // return fetch(rpc,initFetch('core_getAllCandidates'))
  return Promise.resolve({result:[
    {
        "owner": "0x122369F04f32269598789998de33e3d56E2C507a",
        "name": "node0",
        "registered": true,
        "website": "www.node0.com",
        "url": "/ip4/127.0.0.1/tcp/5210/ipfs/1kHcch6yuBCgC5nPPSK3Yp7Es4c4eenxAeK167pYwUvNjRo",
        "voteCount": "0xaef33",
        "binder": "0x34cc5438c9ae5f46aba04d3edccea8c37b1886b6",
        "beneficiary": "0x0000000000000000000000000000000000000003",
        "bind": true
    },
    {
        "owner": "0x3DcF0b3787C31B2bdF62d5bC9128A79c2bb18829",
        "name": "node1",
        "registered": true,
        "website": "www.node1.com",
        "url": "/ip4/127.0.0.1/tcp/5211/ipfs/1kHJFKr2bzUnMr1NbeyYbYJa3RXT18cEu7cNDrHWjg8XYKB",
        "voteCount": "0xaef33",
        "binder": "0x34cc5438c9ae5f46aba04d3edccea8c37b1886b6",
        "beneficiary": "0x0000000000000000000000000000000000000004",
        "bind": false
    }]})
}

export const getCoinbase = () => {
  return new Promise(resolve => {
    window.vnt.core.getCoinbase((err, result) => {
      if (err) {
        console.log(err)//eslint-disable-line
        message.error(err)
      }
      if (result) {
        resolve(result)
      }
    })
  })
}

export const bindCandidate = payload => {
  const { candidate, beneficiary, addr } = payload
  const tx = voteContract.$bindCandidate.sendTransaction(candidate,beneficiary,{ from: addr, value:1e25 })
  console.log(tx) //eslint-disable-line
}

export const unBindCandidate = payload => {
  const { candidate, beneficiary, addr } = payload
  const tx = voteContract.unbindCandidate.sendTransaction(candidate,beneficiary,{from: addr})
  console.log(tx) //eslint-disable-line
}

export const sendTx = (tx, callback) => {
  window.vnt.core.sendTransaction(tx, callback)
}