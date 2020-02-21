import React, { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import paths from '../utils/paths'
import { logout, getNetworkUrl } from '../utils/vnt'
import { LangProvider } from '@translate'
import { getUrlLang } from '../utils/helpers'

import Auth from '../components/Auth.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import { Consumer } from '../components/Context'

const browserHistory = createBrowserHistory() 

function App(props) {
  const { setIsLogin } = props
  useEffect(() => {
    if (typeof window.vnt !== 'undefined') {
      //监听插件登出
      logout(res => {
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
    <LangProvider lang={getUrlLang() || navigator.languages[1]}>
      <Router history={browserHistory}>
        <Route exact path={paths.login} component={Auth(Login)} />
        <Route exact path={paths.home} component={Auth(() => <Home />)} />
      </Router>
    </LangProvider>
  );
}

export default withRouter(Consumer(App))
