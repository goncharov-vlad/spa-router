import Route from './src/Route.js'

/**
 * Main class of route controlling
 *
 * @param routes {Route[]} Array of routes
 */
class Router {
    /**
     * @param routes {Route[]}
     */
    constructor(routes) {
        this.routes = routes

        //When onpopstate is ran executes route action
        window.onpopstate = () => this.findRouteBy('name', this.getCurrentRouteName()).action()

        this.initMutationObserver()

        let routeElements = this.determinateRouteElements()

        if (routeElements.length) {
            this.addRouteEventListenerToRouteElements(routeElements)

        }

        this.runInitialRoute()

    }

    determinateRouteElements() {
        return document.querySelectorAll('[route]')

    }

    addRouteEventListenerToRouteElements(routeElements) {
        for (let routeElement of routeElements) {
            this.addRouteEventListenerToElement(routeElement)

        }

    }

    runInitialRoute() {
        let initialPath = window.location.pathname

        let initialRoute = this.defineInitialRouteByUrl(initialPath)

        let dataFromUrl = initialRoute.getUrlTemplate().fetchRouteDataFromPath(initialPath)

        window.history.replaceState({'routeName': initialRoute.name}, 'name', initialPath)
        initialRoute.action(dataFromUrl)

    }

    defineInitialRouteByUrl(url) {
        let route = this.defineRouteByCurrentPath(url)

        //If route is not found executes "not found" route
        if (!route) {
            let notFoundRoute = this.findRouteBy('name', 'not-found')
            //If "not found" route is not defined then assign default "not found" route
            if (!notFoundRoute) {
                notFoundRoute = new Route('not-found', () => console.log('not found'), url)

            }

            route = notFoundRoute
        }

        return route

    }

    defineRouteByCurrentPath(url) {
        for (let route of this.routes) {
            if (route.getUrlTemplate().pathMatch(url)) {
                return route

            }

        }

        return false

    }

    /**
     * @param routeElement {Element}
     */
    addRouteEventListenerToElement(routeElement) {
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

        route.getUrlTemplate().getTemplateItems().forEach((item) => {
            if (!routeValues.hasOwnProperty(item) || !routeValues[item]) {
                throw new Error('Route "' + routeName + '" must has "' + item + '" value')

            }

        })

        routeElement.addEventListener('click', (event) => {
            event.preventDefault()
            this.executeRoute(routeValues, route)

        })

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
     * If the route is not current executes route action and commits it in history state
     *
     * @param routeValues {{}}
     * @param route {Route}
     */
    executeRoute(routeValues, route) {
        if (this.getCurrentRouteName() !== route.name) {
            route.action(routeValues)

            let routeUrl = route.getUrlTemplate().replaceRouteUrlTemplateItemsWithValues(routeValues)

            window.history.pushState({'routeName': route.name}, 'name', routeUrl)

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
                        this.addRouteEventListenerToElement(node)

                    }

                })

            })

        })

        mutationObserver.observe(document.body, {childList: true, subtree: true})

    }

}

export default Router
export {Route}
