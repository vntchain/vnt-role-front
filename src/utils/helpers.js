export const UpperCase = str => {
  return str.toUpperCase()
}

export function getQueryStringParams(query) {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
      .split('&')
      .reduce((params, param) => {
        const [key, value] = param.split('=');
        // eslint-disable-next-line no-param-reassign
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
        return params;
      }, {})
    : {};
}

export function urlParamsToString(params) {
  const paramStr = Object.keys(params).reduce((sum, key, i) => (i === Object.keys(params).length - 1 ? `${sum + key}=${params[key]}` : `${sum + key}=${params[key]}&`), '');
  return paramStr ? `?${paramStr}` : '';
}

export const getUrlLang = () => {
  return window.location.search ? getQueryStringParams(window.location.search)['language'] : null
}

export const addLanguageUrl = path => {
  const lang = getUrlLang()
  return lang ? `${path}?language=${lang}` : path
}