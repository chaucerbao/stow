import test from 'ava'
import Stow from './stow'

class MockModel {
  constructor(public name: string) {}
}

test.beforeEach(t => {
  t.context.stow = new Stow<MockModel>(() => new MockModel('Initial name'))
})

test('new Stow()', t => {
  const { stow } = t.context

  t.true(stow instanceof Stow)
})

test('.get(id)', t => {
  const { stow } = t.context

  const model = stow.get(1)

  t.is(model.name, 'Initial name')
})

test('.set(id)', t => {
  const { stow } = t.context

  const model = stow.set(1)

  t.is(model.name, 'Initial name')
})

test('.set(id, props)', t => {
  const { stow } = t.context

  const model = stow.set(1, { name: 'Ken Masters' })

  t.is(model.name, 'Ken Masters')
})

test('.set(id, props) then .get(id)', t => {
  const { stow } = t.context

  stow.set(1, { name: 'Ken Masters' })
  const model = stow.get(1)

  t.is(model.name, 'Ken Masters')
})

test('.set(id, props) with extra props', t => {
  const { stow } = t.context

  const model = stow.set(1, { name: 'Ken Masters', age: 34 })

  t.is(model['name'], 'Ken Masters')
  t.is(model['age'], undefined)
})

test('.dump()', t => {
  const { stow } = t.context

  stow.set(1, { name: 'Ken Masters' })
  stow.set(2, { name: 'Ryu Hoshi' })

  const models = stow.dump()

  t.is(typeof models[Symbol.iterator], 'function')
  t.deepEqual(models.next().value, new MockModel('Ken Masters'))
  t.deepEqual(models.next().value, new MockModel('Ryu Hoshi'))
})
