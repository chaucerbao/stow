// Type definitions
export type MapKey = string | number
export interface ModelProps {
  [key: string]: any
}

// Stow
export default class Stow<Model extends ModelProps> {
  private collection: Map<MapKey, Model> = new Map()

  constructor(private newModel: () => Model) {}

  get(id: MapKey) {
    const idString = id.toString()
    const { collection, newModel } = this

    if (!collection.has(idString)) {
      collection.set(idString, newModel())
    }

    return collection.get(idString)!
  }

  set(id: MapKey, props?: ModelProps) {
    const model = this.get(id.toString())

    if (props) {
      Object.keys(props).forEach(prop => {
        if (model.hasOwnProperty(prop)) {
          model[prop] = props[prop]
        }
      })
    }

    return model
  }
}
