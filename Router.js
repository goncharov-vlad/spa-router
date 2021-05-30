import Route from './src/Route.js'

class Router {
    /**
     * Array of routes
     *
     * @param routes
     */
    routes

    /**
     * Main class of route controlling
     *
     * @param routes {Route[]}
     */
    constructor(routes) {
        this.routes = routes
        this.init()

    }

    /**
     * Runs document observer for finding new added route element in DOM object,
     * Determines existing route element in DOM and adds callback action of the route,
     * Resolves by url, executes and commits first loaded route in history state
     */
    init() {
        //Commits the route in history state
        window.onpopstate = () => this.findRouteBy('name', this.getCurrentRouteName()).action()
        //Runs document observer for finding new added route element in DOM object
        this.initMutationObserver()
        //Determines existing route element in DOM and adds callback action of the route
        let routeElements = document.querySelectorAll('[route]')

        for (let routeElement of routeElements) {
            this.addRouteElementEventListener(routeElement)

        }
        //Resolves route by current url
        let currentUrl = window.location.pathname
        let route = this.defineRouteByCurrentPath(currentUrl)

        //If route is not found executes "not found" route
        if (!route) {
            let notFoundRoute = this.findRouteBy('name', 'not-found')
            //If "not found" route is not defined then assign default "not found" route
            if (!notFoundRoute) {
                notFoundRoute = new Route('not-found', () => console.log('not found'), currentUrl)

            }

            route = notFoundRoute
        }

        let dataFromUrl = route.fetchDataFromUrl(currentUrl)

        //Run initial route
        window.history.replaceState({'routeName': route.name}, 'name', currentUrl)
        route.action(dataFromUrl)

    }

    /**
     * @param routeElement {Element}
     */
    addRouteElementEventListener(routeElement) {
        let attributeRouteData = JSON.parse(routeElement.getAttribute('route'))

        let routeName = attributeRouteData.name

        if (!routeName) {
            return

        }

        let route = this.findRouteBy('name', routeName)

        if (!route) {
            throw new Error('Route "' + routeName + '" not exists')

        }

        let routeValues = attributeRouteData.values

        route.urlItems.forEach((item) => {
            if (!routeValues.hasOwnProperty(item) || !routeValues[item]) {
                throw new Error('Route "' + routeName + '" must has "' + item + '" value')

            }

        })

        routeElement.addEventListener('click', (event) => {
            event.preventDefault()
            this.executeRoute(routeValues, route)

        })

    }

    defineRouteByCurrentPath(currentPath) {
        for (let route of this.routes) {
            if (route.isRoutePath(currentPath)) {
                return route

            }

        }

        return false

    }

    /**
     * @returns {boolean|Route}
     * @param key string
     * @param value {*}
     */
    findRouteBy(key, value) {
        for (let route of this.routes) {
            if (route.hasOwnProperty(key) && route[key] === value) {
                return route

            }

        }

        return false

    }

    /**
     * Executes route action and commits it in history state if the route is not current
     *
     * @param routeValues {{}}
     * @param route {Route}
     */
    executeRoute(routeValues, route) {
        route.action(routeValues)

        if (this.getCurrentRouteName() !== route.name) {
            window.history.pushState({'routeName': route.name}, 'name', route.makeUrlFromValues(routeValues))

        }

    }

    /**
     * @returns {string}
     */
    getCurrentRouteName() {
        return window.history.state.routeName

    }

    /**
     * Adds route action callback if new route element has added to DOM object
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
