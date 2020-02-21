import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Icon, Dropdown, Menu} from 'antd'
import { LangConsumer } from '@translate'
import { langOptions } from '../constants'
import { getQueryStringParams, urlParamsToString } from '../utils/helpers'
import './SwitchLanguage.scss'

function SwitchLanguage(props) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false)
  const { contentClassName, history } = props
  
  return (
    <LangConsumer>
      {({ lang, changeLang }) => {
        const handleMenuClick = val => {
          const selectedLangValue = val.key
          if (selectedLangValue !== lang) {
            setIsDropDownVisible(false)
            changeLang()
            const qs = getQueryStringParams(window.location.search)
            qs.language = selectedLangValue;
            const searchStr = urlParamsToString(qs);
            history.replace(`${window.location.pathname}${searchStr}`);
          }
        }
        const LangMenu = () => {
          return (
            <Menu onClick={handleMenuClick}>
              {
                Object.keys(langOptions).map(key => (
                  <Menu.Item key={key}>
                    <span>{langOptions[key]}</span>
                  </Menu.Item>
                ))
              }
            </Menu>
          )
        }
        const handleVisibleChange = flag => {
          setIsDropDownVisible(flag)
        }
        return (
          <Dropdown
            overlay={<LangMenu handleMenuClick={handleMenuClick} />}
            overlayClassName={'lang__menu'}
            visible={isDropDownVisible}
            onVisibleChange={handleVisibleChange}
            placement="bottomCenter"
          >
            <span className={`lang__dropdown ${contentClassName}`}>
              {langOptions[lang]}
              <Icon type="down" />
            </span>
          </Dropdown>
        )
      }}
    </LangConsumer>
  )
}

export default withRouter(SwitchLanguage)
