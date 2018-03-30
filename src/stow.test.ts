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

  const modelA = stow.get(1)
  const modelB = stow.get(1)

  t.is(modelA.name, 'Initial name')
  t.is(modelA, modelB)
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

  stow.set(1, { name: 'Ryu Hoshi' })

  t.is(model.name, 'Ryu Hoshi')
})

test('.set(id, props) then .get(id)', t => {
  const { stow } = t.context

  const modelA = stow.set(1, { name: 'Ken Masters' })
  const modelB = stow.get(1)

  t.is(modelB.name, 'Ken Masters')
  t.is(modelA, modelB)
})

test('.set(id, props) with extra props', t => {
  const { stow } = t.context

  const model = stow.set(1, { name: 'Ken Masters', age: 34 })

  t.is(model['name'], 'Ken Masters')
  t.is(model['age'], undefined)
})

test('.size', t => {
  const { stow } = t.context

  stow.set(1, { name: 'Ken Masters' })

  t.is(stow.size, 1)

  stow.set(2, { name: 'Ryu Hoshi' })

  t.is(stow.size, 2)
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
