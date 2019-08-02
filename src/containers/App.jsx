import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import paths from '../utils/paths'
import { message } from 'antd'

import Auth from '../components/Auth.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import { Consumer } from '../components/Context'

function App(props) {
  console.log('app') //eslint-disable-line
  const { setIsLogin } = props
  useEffect(() => {
    //监听插件登出
    window.vnt.logout((err, result) => {
      console.log(err, result)//eslint-disable-line
      if (err) {
        console.log(err)//eslint-disable-line
        message.error(err)
      }
      if (result) {
        // localStorage.setItem('ROLE_IS_LOGIN', 'false')
        setIsLogin(false)
        props.history.push(paths.login)
      }
    })
  },[])
  return (
    <Switch>
      <Route exact path={paths.login} component={Auth(Login)} />
      <Route exact path={paths.home} component={Auth(Home)} />
    </Switch>
  );
}

export default withRouter(Consumer(App))
