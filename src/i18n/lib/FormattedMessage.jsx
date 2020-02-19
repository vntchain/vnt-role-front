import React from 'react'
import PropTypes from 'prop-types'
import { LangConsumer } from './LangContext'
import enText from '../locale/en'
import zhText from '../locale/zh'

const localeText = {
  en: enText,
  zh: zhText
}

const FormattedMessage = props => {
  const { id, plain } = props

  return (
    <LangConsumer>
      {({ lang }) => (
        plain ? localeText[lang][id] : <span>{localeText[lang][id]}</span>
      )}
    </LangConsumer>
  )
}

FormattedMessage.propTypes = {
  id: PropTypes.string.isRequired,
  plain: PropTypes.bool
}

FormattedMessage.defaltProps = {
  plain: false
}

export default FormattedMessage
