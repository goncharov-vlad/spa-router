import Route from './Route'
import Repository from './Repository'
import PathTemplate from './PathTemplate'
import Router from './Router'

type Params = { [key: string]: string }

type Action = (values?: Params) => void

type Part = {
  element: string
  isValue?: true
}

type Parts = Part[]

type Routes = Route[]

type ConfigRoute = {
  pathTemplate: string
  action: Action
}

type ConfigRoutes = ConfigRoute[]

type Config = {
  stack: ConfigRoutes
  notFoundAction?: Action
}

export {
  Route,
  Repository,
  PathTemplate,
  Part,
  Params,
  Action,
  Parts,
  Routes,
  ConfigRoutes,
  ConfigRoute,
  Config
}

export default Router
