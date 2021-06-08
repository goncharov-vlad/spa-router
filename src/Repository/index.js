import Route from "../Route";

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

        let notFoundRoute = this.findByName('not-found')
        //If "not found" route is not defined then assign default "not found" route
        if (!notFoundRoute) {
            notFoundRoute = new Route('not-found', () => console.log('not found'), '/404')

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