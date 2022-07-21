import {
  Route,
  Routes,
  ConfigRoute,
  ConfigRoutes
} from './types'

export default class Repository {
  private routes: Routes

  constructor (stack: ConfigRoutes) {
    this.routes = []

    stack.forEach((configRoute: ConfigRoute) => {
      const pathTemplate = configRoute.pathTemplate.trim()

      if (this.findByPathTemplate(pathTemplate)) {
        throw new Error('Route template must be unique')
      }

      const route = new Route(pathTemplate, configRoute.action)

      this.routes.push(route)
    })
  }

  findByPath (path: string): Route | null {
    for (const route of this.routes) {
      if (route.isPathMatch(path)) {
        return route
      }
    }

    return null
  }

  findByPathTemplate (pathTemplate: string) {
    for (const route of this.routes) {
      if (route.pathTemplate.template === pathTemplate) {
        return route
      }
    }

    return null
  }
}
