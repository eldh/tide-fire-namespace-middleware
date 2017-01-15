import {curry} from 'tide-fire'

export default function namespaceMiddleware(fn, name, obj) {
  return (...args) => getNewFn(fn, getNamespace(fn, obj), args)
}

function getNamespace(fn, obj) {
  return fn.__namespace || obj.__namespace || []
}

function getNewFn(fn, namespace, [data, {get, set, tide}]) {
  const _get = (path) => get([...namespace, ...path])
  const _set = curry((path, val) => set([...namespace, ...path], val))
  return fn(data, {get: _get, set: _set, tide, getGlobal: get, setGlobal: set})
}
