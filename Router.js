import Route from './src/Route.js'

class Router {

    constructor(routes) {
        this.routes = routes
        this.init()

    }

    init() {
        this.initMutationObserver()
        this.determineExistsSelectorRoutes()

        let currentUrl = window.location.pathname
        let route = this.findRouteByUrl(currentUrl)

        if (!route) {
            let notFoundRoute = this.findRouteByName('not-found')

            if (!notFoundRoute) {
                notFoundRoute = new Route(currentUrl, () => console.log('not found'), 'not-found')

            }

            route = notFoundRoute
        }

        window.history.replaceState({'routeName': route.name}, 'name', route.url)
        window.onpopstate = () => this.findRouteByName(window.history.state.routeName).action()

        route.action()

    }

    determineExistsSelectorRoutes() {
        let routeElements = document.querySelectorAll('[route]')

        for (let routeElement of routeElements) {
            this.addRouteElementEventListener(routeElement)

        }

    }

    /**
     * @param routeElement {Element}
     */
    addRouteElementEventListener(routeElement) {
        let routeName = routeElement.getAttribute('route')

        if (!routeName) {
            return

        }

        let route = this.findRouteByName(routeName)

        let listenerCallback = (event) => {
            event.preventDefault()
            throw new Error('Route ' + routeName + ' not exists')

        }

        if (route) {
            listenerCallback = (event) => {
                event.preventDefault()
                this.executeRoute(route)

            }

        }

        routeElement.addEventListener('click', listenerCallback)

    }

    /**
     *
     * @param name {string}
     * @returns {boolean|Route}
     */
    findRouteByName(name) {
        for (let route of this.routes) {
            if (route.name === name) {
                return route

            }

        }

        return false

    }

    /**
     * @param url {string}
     * @returns {boolean|Route}
     */
    findRouteByUrl(url) {
        for (let route of this.routes) {
            if (route.url === url) {
                return route

            }

        }

        return false

    }

    /**
     * @param route {Route}
     */
    executeRoute(route) {
        if (window.history.state.routeName !== route.name) {
            route.action()

            window.history.pushState({'routeName': route.name}, 'name', route.url)

        }

    }

    /**
     *
     */
    initMutationObserver() {
        let mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node instanceof Element && node.hasAttribute('route')) {
                        this.addRouteElementEventListener(node)

                    }

                })

            })

        })

        mutationObserver.observe(document.body, {childList: true, subtree: true})

    }

}

export default Router
export {Route}
