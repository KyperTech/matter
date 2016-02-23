import logger from './logger'

/**
 * @description Checks to see if current context is a browser
 * @return {Boolean}
 */
export function isBrowser () {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/**
 * @description Appends given css source to DOM head.
 * @param {String} src - url src for css to append
 */
export function loadCss (src) {
  if (!isBrowser()) {
    logger.error({
      description: 'Load CSS only works within browsers.',
      func: 'loadCss', obj: 'dom'
    })
    throw new Error('Document object is required to load assets.')
  }
  let css = document.createElement('link')
  css.rel = 'stylesheet'
  css.type = 'text/css'
  css.href = src
  document.getElementsByTagName('head')[0].insertBefore(css, document.getElementsByTagName('head')[0].firstChild)
  logger.debug({
    description: 'CSS was loaded into document.', element: css,
    func: 'loadCss', obj: 'dom'
  })
  // Return link element
  return css
}

/**
 * @description Appends given javascript source to DOM head.
 * @param {String} src - url src for javascript to append
 */
export function loadJs (src) {
  if (!isBrowser()) {
    logger.error({
      description: 'Document does not exsist to load assets into.',
      func: 'loadJs', obj: 'dom'
    })
    throw new Error('Document object is required to load assets.')
  }
  let js = window.document.createElement('script')
  js.src = src
  js.type = 'text/javascript'
  window.document.getElementsByTagName('head')[0].appendChild(js)
  logger.debug({
    description: 'JS was loaded into document.', element: js,
    func: 'loadJs', obj: 'dom'
  })
  // Return script element
  return js
}

/**
 * @description Appends given javascript source to DOM head.
 * @param {String} src - url src for javascript to append
 *
 */
export function asyncLoadJs (src) {
  if (!isBrowser()) {
    logger.error({
      description: 'Document does not exsist to load assets into.',
      func: 'asyncLoadJs', obj: 'dom'
    })
    throw new Error('Document object is required to load assets.')
  }
  let js = window.document.createElement('script')
  js.src = src
  js.type = 'text/javascript'
  window.document.getElementsByTagName('head')[0].appendChild(js)
  logger.log({
    description: 'JS was loaded into document.', element: js,
    func: 'asyncLoadJs', obj: 'dom'
  })
  return new Promise((resolve) => {
    window.setTimeout(resolve, 200)
  })
}

/**
 * @description Get query param from current location/url
 * @param {String} name - Name of query parameter to get
 *
 */
export function getQueryParam (name) {
  if (!isBrowser()) {
    logger.error({
      description: 'Browser is required to get query params.',
      func: 'asyncLoadJs', obj: 'dom'
    })
    throw new Error('Query parameters are only available within browsers.')
  }
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  const results = regex.exec(window.location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}
