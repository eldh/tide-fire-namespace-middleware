import {test} from 'ava'
import {fire, init} from 'tide-fire'
import {Base} from 'tide'
import {Record, Map, fromJS} from 'immutable'
import namespaceMiddleware from '../src/index'

const tide = new Base()
const record = new Record({
  earth: Map({weather: null}),
  foo: fromJS({
    bar: {
      beer: 'mikkeller',
      drink: null,
    },
  }),
})

tide.setState(record(Map()))

const middleSpy = namespaceMiddleware
const getBeer = (_, {get}) => get(['beer'])
const getDrink = (_, {get}) => get(['drink'])
const setDrink = (drink, {get, set}) => set(['drink'], drink)
const setOutsideWeather = (weather, {setGlobal}) =>
  setGlobal(['earth', 'weather'], weather)
const setOutsideTemperature = (weather, {setGlobal}) =>
  setGlobal(['earth', 'temperature'], weather)
const getOutsideTemperature = (_, {getGlobal}) => getGlobal(['earth', 'temperature'])
const getWeather = (_, {get}) => get(['earth', 'weather'])

init(tide, {
  bar: {
    getBeer,
    getDrink,
    setDrink,
    setOutsideWeather,
    getOutsideTemperature,
    setOutsideTemperature,
    __namespace: ['foo', 'bar'],
  },
  earth: {getWeather},
}, [middleSpy])

test('should get from namespaced state', (t) =>
  fire('bar.getBeer').then((beer) => {
    t.is('mikkeller', beer)
    t.is('mikkeller', tide.get(['foo', 'bar', 'beer']))
  })
)

test('should set on namespaced state', (t) =>
  fire('bar.setDrink', 'Manhattan')
    .then(() => fire('bar.getDrink'))
    .then((drink) => {
      t.is('Manhattan', drink)
    })
)

test('should set on global state', (t) =>
  fire('bar.setOutsideWeather', 'rainy')
    .then(() => fire('earth.getWeather'))
    .then((weather) => {
      t.is('rainy', weather)
    })
)

test('should get from global state', (t) =>
  fire('bar.setOutsideTemperature', '21')
    .then(() => fire('bar.getOutsideTemperature'))
    .then((temp) => {
      t.is('21', temp)
    })
)
