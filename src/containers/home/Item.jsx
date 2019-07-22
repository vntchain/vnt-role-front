import React from 'react'
import Copier from '../../components/Copier'

import './Item.scss'

export default function Item() {
  const copyRef = React.createRef()
  return (
    <div className="super-item">
      <div>
        <p className="super-item__status">已锁仓</p>
        <p className="super-item__cont">
          <label>节点名称：</label>
          <span>SuperVNT</span>
        </p>
        <p className="super-item__cont">
          <label>节点地址：</label>
          <span>0x123f3f23f23f23f23f23f23f23f23f</span>
          <Copier ref={copyRef} text={''}>
            <a href="javascript:">复制</a>
          </Copier>
        </p>
        {/* 已锁仓 */}
        <p className="super-item__cont">
          <label>节点名称：</label>
          <span>0x123f3f23f23f23f23f23f23f23f23f</span>
        </p>
        <p className="super-item__cont">
          <label>锁仓时间：</label>
          <span>2019-00-00</span>
        </p>
        {/* 未锁仓 */}
        <p className="super-item__cont">
          <label>节点地址：</label>
          <input type="text" placeholder="请确认节点地址" />
        </p>
        <p className="super-item__cont">
          <label>受益人：</label>
          <input type="text" placeholder="请输入受益人地址" />
        </p>
      </div>
      {/* 已锁仓 */}
      <a href="javascript:" className="super-item__button super-item__button-blue">退出锁仓</a>
      {/* 未锁仓 */}
      {/* <a href="javascript:" className="super-item__button super-item__button-green">锁仓1000万 VNT</a> */}
    </div>
  )
}