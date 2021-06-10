import Repository from "./src/Repository/Repository.js";
import Route from "./src/Route/Route";

class Router {

    /**
     * @property {Repository}
     * @protected
     */
    _repository

    /**
     * @param routeStack {{}[]}
     */
    constructor(routeStack) {
        if (routeStack === undefined) {
            throw new Error('Specify stack of routes')

        }

        if (!Array.isArray(routeStack)) {
            throw new Error('Stack of routes must be array type')

        }

        let routes = []

        routeStack.forEach((route) => {
            if (!(route instanceof Object) || route instanceof Array) {
                throw new Error('Route must be object type')

            }

            routes.push(new Route(route.path, route.action, route.name))

        })

        this._repository = new Repository(routes)

        //When onpopstate is ran
        window.onpopstate = () => this.executeRouteByPath(window.location.pathname, true)
        //Gets all route elements from DOM
        let routeElements = document.querySelectorAll('[route]')

        for (let routeElement of routeElements) {
            //When a click to route
            routeElement.addEventListener('click', (event) => this.onClickEvent(event, routeElement))

        }

        let mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node instanceof Element && node.hasAttribute('route')) {
                        //When a new route element in DOM
                        node.addEventListener('click', (event) => this.onClickEvent(event, node))

                    }

                })

            })

        })

        mutationObserver.observe(document.body, {childList: true, subtree: true})

        this.executeRouteByPath(window.location.pathname, true)

    }

    /**
     * @param event {Event}
     * @param element {$ElementType}
     */
    onClickEvent(event, element) {
        event.preventDefault()

        let path = element.getAttribute('route')

        this.executeRouteByPath(path)

    }

    /**
     * @param path {string}
     * @param replaceState {boolean}
     */
    executeRouteByPath(path, replaceState = false) {
        let route = this._repository.findByPath(path)

        if (!route) {
            route = this._repository.notFoundRoute

        }

        let values = route.fetchPathValues(path)

        route.execute(values)

        if (replaceState) {
            window.history.replaceState({}, '', window.location.pathname)

        } else {
            window.history.pushState({}, '', route.makePath(values))

        }

    }

}

export default Router
