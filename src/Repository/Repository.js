import Route from "../Route/Route.js";

class Repository {

    /**
     * @property {Route[]}
     * @protected
     */
    _routes

    /**
     * @property {Route}
     * @protected
     */
    _notFoundRoute

    /**
     * @param routes {Route[]}
     */
    constructor(routes) {
        this._routes = routes
console.log(routes)
        let notFoundRoute = this.findByName('not-found')
        console.log(notFoundRoute)
        //If "not found" route is not defined then assign default "not found" route
        if (!notFoundRoute) {
            notFoundRoute = new Route('/404', () => console.log('not found'), 'not-found')

        }

        this._notFoundRoute = notFoundRoute

    }

    /**
     *
     * @return {_notFoundRoute}
     */
    get notFoundRoute() {
        return this._notFoundRoute

    }

    /**
     * @param name
     * @return boolean|Route
     */
    findByName(name) {
        for (let route of this._routes) {
            if (route.name === name) {
                return route

            }

        }

        return false

    }

    /**
     * @param path
     * @return boolean|Route
     */
    findByPath(path) {
        for (let route of this._routes) {
            if (route.pathMatch(path)) {
                return route

            }

        }

        return false

    }

}

export default Repository