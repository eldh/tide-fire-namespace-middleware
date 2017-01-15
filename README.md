# Tide Fire Namespace middleware

## What?
Middleware for [tide-fire](https://github.com/tictail/tide-fire) that allows for namespaced action handlers.

## Why?
For some applications it's natural to separate different parts of the app into namespaces. Since tide-fire is built specifically for large apps, it makes sense to also support namespaces.

## How?
Install by adding tide-fire-namespace-middleware to your middleware array when you init fide-fire.

``` js
import namespaceMiddleware from 'tide-fire-namespace-middleware'

/*
Assume the following state shape:
const state = {
  bar: {
    beer: 'Singha',
  },
  weather: 'Rainy',
}
*/

init(tide, actionHandlers, [namespaceMiddleware])
```

If you want to set a namespace for a set of action handlers, define a `__namespace` prop on that part of the actionHandlers object.

``` js
const actionHandlers = {
  bar: {
    setBeer: (data, {get, set}) => set(['beer'], data),
    __namespace: ['bar'],
  },
}
```

In the example above, `set(['beer', data])` will set data on the path `['bar', 'beer']`. Similarly, `get(['beer'])` would get from `['bar', 'beer']`.

Action handlers also have access to `getGlobal` and `setGlobal` functions.

``` js
const actionHandlers = {
  bar: {
    getWeather: (_, {getGlobal}) => getGlobal(['weather']),
    setWeather: (data, {setGlobal}) => setGlobal(['weather', data]),
    __namespace: ['bar'],
  },
}
```

## Reporting issues

Issues should be filed [here on github](https://github.com/tictail/tide-fire/issues).
