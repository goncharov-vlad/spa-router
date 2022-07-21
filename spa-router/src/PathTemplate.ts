import { Params, Part, Parts } from './types'

export default class PathTemplate {
  private parts: Parts
  template: string

  constructor (pathTemplate: string) {
    if (pathTemplate[0] !== '/') {
      throw new Error('Route path template must start from slash')
    }

    if (pathTemplate.indexOf('?') > -1) {
      throw new Error("Route path template can't contain question mark")
    }

    this.template = pathTemplate.trim()
    this.parts = []

    this.template.split('/').forEach((element: string) => {
      const part: Part = { element }
      const firstSymbol = element[0]
      const lastSymbol = element[element.length - 1]

      if (firstSymbol === '{' && lastSymbol === '}') {
        part.element = element.substring(1).slice(0, -1).trim()
        part.isValue = true
      }

      this.parts.push(part)
    })
  }

  fetchPathValues (path: string) {
    const values: Params = {}

    path.split('/').forEach((part, index) => {
      const templatePart = this.findPartByIndex(index)

      if (templatePart && templatePart.isValue) {
        values[templatePart.element] = part
      }
    })

    return values
  }

  findPartByIndex (index: number): Part | null {
    return this.parts[index] || null
  }

  getValueParts () {
    const parts: Parts = []

    this.parts.forEach(part => {
      if (part.isValue) {
        parts.push(part)
      }
    })

    return parts
  }

  makePath (values: Params) {
    const pathParts: string[] = []

    this.parts.forEach((part) => pathParts.push(part.isValue ? values[part.element] : part.element))

    return pathParts.join('/')
  }

  isPathMatch (path: string) {
    const pathParts = path.split('/')

    let result = false

    if (pathParts.length !== this.parts.length) {
      return result
    }

    pathParts.forEach((part, index) => {
      const templatePart = this.findPartByIndex(index)

      if (!templatePart || templatePart.isValue) {
        return
      }

      result = part === templatePart.element
    })

    return result
  }
}
