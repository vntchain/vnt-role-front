import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import paths from '../utils/paths'
// import { message } from 'antd'
import { logout, getNetworkUrl } from '../utils/vnt'

import Auth from '../components/Auth.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import { Consumer } from '../components/Context'

function App(props) {
  const { setIsLogin } = props
  useEffect(() => {
    if (typeof window.vnt !== 'undefined') {
      //监听插件登出
      logout().then(res => {
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
    <Switch>
      <Route exact path={paths.login} component={Auth(Login)} />
      <Route exact path={paths.home} component={Auth(Home)} />
    </Switch>
  );
}

export default withRouter(Consumer(App))
