import React from 'react'
import { Select } from 'antd'
import { LangConsumer } from '@translate'
// import styles from './SwitchLanguage.scss'

const Option = Select.Option

function SwitchLanguage() {
  const langOptions = {
    zh: '中文',
    en: 'English'
  }
  return (
    <LangConsumer>
      {({ lang, changeLang }) => {
        const handleSelectChange = val => {
          if (val !== lang) {
            changeLang()
          }
        }
        return (
          <div>
            <Select
              value={langOptions[lang]}
              onChange={handleSelectChange}
              style={{color: 'red'}}
            >
              {Object.keys(langOptions).map(key => (
                <Option key={key}>{langOptions[key]}</Option>
              ))}
            </Select>
            {/* <div className={styles.select}>
              <span>{langOptions[lang]}</span>
              <Icon type="down" />
            </div>
            <ul className={styles.options}>
              {
                Object.keys(langOptions).map(key => (
                  <li key={key} onClick={() => handleSelectClick(key)}>
                    {langOptions[key]}
                  </li>
                ))
              }
            </ul> */}
          </div>
        )
      }}
    </LangConsumer>
  )
}

export default SwitchLanguage
