import React, { useState } from 'react'

export const Context = React.createContext({
  isLogin: false,
  isQuitModalVisible: false,
  bindObj: {}
})

export const Provider = function(props){
  const [isLogin, setIsLogin] = useState(false)
  const [isQuitModalVisible, setIsQuitModalVisible] = useState(false)
  const [isBindModalVisible, setIsBindModalVisible] = useState(false)
  const [bindObj, setBindObj] = useState({})
  return (
    <Context.Provider
      value={{
        isLogin,
        setIsLogin,
        isQuitModalVisible,
        setIsQuitModalVisible,
        isBindModalVisible,
        setIsBindModalVisible,
        bindObj,
        setBindObj
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export const Consumer = function(WrappedComponent){
  // eslint-disable-next-line react/display-name
  return props => (
    <Context.Consumer>
      {consumer => <WrappedComponent {...consumer} {...props} />}
    </Context.Consumer>
  )
}
