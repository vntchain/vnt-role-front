import React, { useState } from 'react'

export const Context = React.createContext({
  isLogin: false,
})

export const Provider = function(props){
  const [isLogin, setIsLogin] = useState(true)
  return (
    <Context.Provider
      value={{
        isLogin,
        setIsLogin,
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
