import {
  Action,
  Config,
  Repository
} from './types'

class Router {
  private notFoundAction: Action | undefined
  private repository: Repository

  constructor (config: Config) {
    const { stack, notFoundAction } = config

    this.repository = new Repository(stack)
    this.notFoundAction = notFoundAction

    window.onpopstate = () => this.execute(this.currentUrl, true)

    this.initLinks()
    this.initMutationObserver()

    this.execute(this.currentUrl, true)
  }

  get currentUrl () {
    return window.location.pathname + window.location.search
  }

  private initLinks () {
    const routeElements = document.querySelectorAll('a[href]')

    for (const routeElement of routeElements) {
      routeElement.addEventListener('click', event => this.onClickEvent(event, routeElement))
    }
  }

  private initMutationObserver () {
    const mutationObserver = new MutationObserver(mutations => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(node => {
          if (node instanceof Element && node.tagName === 'A' && node.hasAttribute('href')) {
            node.addEventListener('click', (event) => this.onClickEvent(event, node))
          }
        })
      })
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })
  }

  private onClickEvent (event: Event, element: Element) {
    event.preventDefault()

    if (element.tagName !== 'A') {
      throw new Error('Element must be link')
    }

    let path = element.getAttribute('href')

    if (!path || path[0] !== '/') {
      return
    }

    path = path.trim()

    if (path === this.currentUrl) {
      return
    }

    this.execute(path)
  }

  private execute (path: string, replaceState = false) {
    let params = ''
    // If params is passed
    if (path.indexOf('?') > -1) {
      params = path.substring(path.indexOf('?'))
    }

    let action = this.notFoundAction
    let pathname = path.replace(params, '')

    // Default not found action
    if (!action) {
      action = () => console.log('not-found')
    }

    const route = this.repository.findByPath(pathname)

    if (route) {
      const values = route.fetchPathValues(pathname)

      action = () => route.execute(values)

      pathname = route.makePath(values)
    }

    const newPath = pathname + params

    if (replaceState) {
      window.history.replaceState({}, '', newPath)
    } else {
      window.history.pushState({}, '', newPath)
    }

    action()
  }
}

/**
 * In order to encourage the use of CommonJS and ES6 modules,
 * when exporting a default export with no other exports module.exports
 * will be set in addition to exports.default
 *
 * SOURCE: https://stackoverflow.com/questions/41289200/output-an-es-module-using-webpack
 */
export default Router
exports.default = Router
module.exports = exports.default
