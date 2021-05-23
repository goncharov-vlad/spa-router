import Route from './src/Route.js'

export {Route}

export default class Router {
    routes

    constructor(routes) {
        this.routes = routes
        this.init()

    }

    init() {
        this.determineExistsSelectorRoutes()

        let currentUrl = window.location.pathname
        let currentRoute = this.findRouteByUrl(currentUrl)

        let route = currentRoute ? currentRoute : new Route(currentUrl, () => console.log('not found'), 'not-found')

        window.history.replaceState({'routeName': route.name}, 'name', route.url)
        window.onpopstate = () => this.findRouteByName(window.history.state.route).action()

        route.action()

    }


    determineExistsSelectorRoutes() {
        let routeSelectors = document.querySelectorAll('[route]')

        for (let routeSelector of routeSelectors) {
            let routeName = routeSelector.getAttribute('route')

            let route = this.findRouteByName(routeName)

            if (route) {
                routeSelector.addEventListener('click', () => this.executeRoute(route))

            } else {
                routeSelector.addEventListener('click', () => {
                    throw 'Route ' + routeName + ' not exists'
                })

            }

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

}

