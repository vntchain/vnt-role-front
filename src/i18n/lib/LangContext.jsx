import React, { useState } from 'react'

const langOptions = {
  chinese: 'zh',
  english: 'en'
}

const LangContext = React.createContext({
  language: langOptions.chinese,
  setLanguage: () => {}
})

export const LangProvider = props => {
  const [lang, setLang] = useState(langOptions.chinese)
  const changeLang = () => {
    const l = lang === langOptions.chinese ? langOptions.english : langOptions.chinese
    setLang(l)
  }
  return (
    <LangContext.Provider value={{ lang, changeLang }}>
      {props.children}
    </LangContext.Provider>
  )
}

export const LangConsumer = LangContext.Consumer
