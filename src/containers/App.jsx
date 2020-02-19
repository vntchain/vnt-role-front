import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import paths from '../utils/paths'
import { logout, getNetworkUrl } from '../utils/vnt'
import { LangProvider } from '@translate'

import Auth from '../components/Auth.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import { Consumer } from '../components/Context'

function App(props) {
  const { setIsLogin } = props
  useEffect(() => {
    if (typeof window.vnt !== 'undefined') {
      //监听插件登出
      logout(res => {
        console.log('logout', res) //eslint-disable-line
        if (res) {
          setIsLogin(false)
          props.history.push(paths.login)
        }
      })
      //获取并监听网络变化
      getNetworkUrl()
    }
  },[])
  return (
    <LangProvider>
      <Switch>
        <Route exact path={paths.login} component={Auth(Login)} />
        <Route exact path={paths.home} component={Auth(() => <Home />)} />
      </Switch>
    </LangProvider>
  );
}

export default withRouter(Consumer(App))
