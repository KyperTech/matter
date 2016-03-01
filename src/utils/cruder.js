import fetch from 'isomorphic-fetch'
import token from './token'

const buildHeaders = () => {
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  if (token.string) {
    headers.Authorization = `Bearer ${token.string}`
  }
  return headers
}

const checkResponseError = body => {
  if (body.code >= 400) {
    const { message, status } = body
    return Promise.reject({ message, status })
  }
  return body
}

export const get = url => _ => {
  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(body => checkResponseError(body))
}

export const remove = url => _ => {
  const headers = buildHeaders()
  return fetch(url, {
    method: 'delete',
    headers
  })
    .then(response => {
      return response.json()
    })
    .then(body => checkResponseError(body))
}

export const update = url => object => {
  const headers = buildHeaders()
  return fetch(url, {
    method: 'put',
    headers,
    body: JSON.stringify(object)
  })
    .then(response => {
      return response.json()
    })
    .then(body => checkResponseError(body))
}

export const create = url => object => {
  const headers = buildHeaders()
  return fetch(url, {
    method: 'post',
    headers,
    body: JSON.stringify(object)
  })
    .then(response => {
      return response.json()
    })
    .then(body => checkResponseError(body))
}

export const add = create

export default (url, types) => {
  let methods = {
    get,
    remove,
    update,
    create,
    add
  }

  return types
    .reduce((returnedMethods, type) => {
      let method = {}
      method[type] = methods[type].call(this, url)
      return Object.assign({}, returnedMethods, method)
    }, {})
}
