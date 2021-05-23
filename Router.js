import Route from './src/Route.js'

export {Route}

export default class Router {
    routes

    constructor(routes) {
        this.routes = routes
        this.init()

    }

    init() {
        this.initMutationObserver()
        this.determineExistsSelectorRoutes()

        let currentUrl = window.location.pathname
        let currentRoute = this.findRouteByUrl(currentUrl)

        let route = currentRoute ? currentRoute : new Route(currentUrl, () => console.log('not found'), 'not-found')

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

    addRouteElementEventListener(routeElement) {
        let routeName = routeElement.getAttribute('route')

        let route = this.findRouteByName(routeName)

        if (route) {
            routeElement.addEventListener('click', () => this.executeRoute(route))

        } else {
            routeElement.addEventListener('click', () => {
                throw 'Route ' + routeName + ' not exists'
            })

        }

    }


    findRouteByName(name) {
        for (let route of this.routes) {
            if (route.name === name) {
                return route

            }

        }

        return false

    }

    findRouteByUrl(url) {
        for (let route of this.routes) {
            if (route.url === url) {
                return route

            }

        }

        return false

    }

    executeRoute(route) {
        if (window.history.state.routeName !== route.name) {
            route.action()

            window.history.pushState({'routeName': route.name}, 'name', route.url)

        }

    }

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

