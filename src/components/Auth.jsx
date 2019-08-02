import React from 'react'
import { Redirect } from 'react-router-dom'
import paths from '../utils/paths'

import { Consumer } from '../components/Context'

export default function Auth(WrappedComponent) {
  // eslint-disable-next-line react/display-name
  return Consumer(props => {
    const { isLogin } = props
    const {location: { pathname }} = props
    //isLogin && pathname !== '/login' || !isLogin && pathname === '/login' => <WrappedComponent />
    if (isLogin) {
      if (pathname === '/login'){
        console.warn('redirect to home')//eslint-disable-line
        return <Redirect to={paths.home} />
      }
    } else if (pathname !== '/login') {
      console.warn('redirect to login')//eslint-disable-line
      return <Redirect to={paths.login} />
    }
    console.warn('render origin ')//eslint-disable-line
    // eslint-disable-next-line react/display-name
    return <WrappedComponent {...props} />
  })
}