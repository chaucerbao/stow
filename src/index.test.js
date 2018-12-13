// Dependencies
import test from 'ava'
import { observable } from 'mobx'

// Stow
import Stow from '../dist'

// Mocks
class MockModel {
  constructor(name) {
    this.name = name
  }
}

// Tests
test.beforeEach(t => {
  t.context.stows = [
    new Stow(() => new MockModel('Initial name')),
    new Stow(() => new MockModel('Initial name'), { observable })
  ]
})

test('new Stow()', t => {
  t.context.stows.forEach(stow => {
    t.true(stow instanceof Stow)
  })
})

test('.get(id)', t => {
  t.context.stows.forEach(stow => {
    const modelA = stow.get(1)
    const modelB = stow.get(1)

    t.is(modelA.name, 'Initial name')
    t.is(modelA, modelB)
  })
})

test('.set(id)', t => {
  t.context.stows.forEach(stow => {
    const model = stow.set(1)

    t.is(model.name, 'Initial name')
  })
})

test('.set(id, props)', t => {
  t.context.stows.forEach(stow => {
    const model = stow.set(1, { name: 'Ken Masters' })

    t.is(model.name, 'Ken Masters')

    stow.set(1, { name: 'Ryu Hoshi' })

    t.is(model.name, 'Ryu Hoshi')
  })
})

test('.set(id, props) then .get(id)', t => {
  t.context.stows.forEach(stow => {
    const modelA = stow.set(1, { name: 'Ken Masters' })
    const modelB = stow.get(1)

    t.is(modelB.name, 'Ken Masters')
    t.is(modelA, modelB)
  })
})

test('.set(id, props) with extra props', t => {
  t.context.stows.forEach(stow => {
    const model = stow.set(1, { name: 'Ken Masters', age: 34 })

    t.is(model['name'], 'Ken Masters')
    t.is(model['age'], undefined)
  })
})

test('.size', t => {
  t.context.stows.forEach(stow => {
    stow.set(1, { name: 'Ken Masters' })

    t.is(stow.size, 1)

    stow.set(2, { name: 'Ryu Hoshi' })

    t.is(stow.size, 2)
  })
})

test('.values()', t => {
  t.context.stows.forEach(stow => {
    stow.set(1, { name: 'Ken Masters' })
    stow.set(2, { name: 'Ryu Hoshi' })

    const models = stow.values()

    t.is(typeof models[Symbol.iterator], 'function')
    t.deepEqual(models.next().value, new MockModel('Ken Masters'))
    t.deepEqual(models.next().value, new MockModel('Ryu Hoshi'))
  })
})
