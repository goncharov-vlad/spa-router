import { Action, Params, PathTemplate } from './types'

export default class Route {
  private action: Action
  pathTemplate: PathTemplate

  constructor (pathTemplate: string, action: Action) {
    this.pathTemplate = new PathTemplate(pathTemplate)
    this.action = action
  }

  makePath (values: Params) {
    return this.pathTemplate.makePath(values)
  }

  isPathMatch (path: string) {
    return this.pathTemplate.isPathMatch(path)
  }

  execute (values: Params) {
    this.action(values)
  }

  fetchPathValues (path: string) {
    return this.pathTemplate.fetchPathValues(path)
  }
}
