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
     * Resolves by url, executes and commits current route in history state
     */
    init() {
        //Runs document observer for finding new added route element in DOM object
        this.initMutationObserver()
        //Determines existing route element in DOM and adds callback action of the route
        let routeElements = document.querySelectorAll('[route]')

        for (let routeElement of routeElements) {
            this.addRouteElementEventListener(routeElement)

        }
        //Resolves route by current url
        let currentUrl = window.location.pathname
        let route = this.findRouteByUrl(currentUrl)
        //If route is not found executes "not found" route
        if (!route) {
            let notFoundRoute = this.findRouteByName('not-found')
            //If "not found" route is not defines then assign default "not found" route
            if (!notFoundRoute) {
                notFoundRoute = new Route(currentUrl, () => console.log('not found'), 'not-found')

            }

            route = notFoundRoute
        }

        //Commits the route in history state
        window.history.replaceState({'routeName': route.name}, 'name', route.url)
        window.onpopstate = () => this.findRouteByName(window.history.state.routeName).action()
        //Executes the route
        route.action()

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
        //Event in case of route is not defined
        let listenerCallback = (event) => {
            event.preventDefault()
            throw new Error('Route ' + routeName + ' not exists')

        }
        //Event in case of route is defined
        if (route) {
            listenerCallback = (event) => {
                event.preventDefault()
                this.executeRoute(route)

            }

        }

        routeElement.addEventListener('click', listenerCallback)

    }

    /**
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
     * Executes route action and commits it in history state if th route is not current
     *
     * @param route {Route}
     */
    executeRoute(route) {
        if (window.history.state.routeName !== route.name) {
            route.action()

            window.history.pushState({'routeName': route.name}, 'name', route.url)

        }

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