import Route from "../Route/Route.js";

class Repository {

    /**
     * @property {Route[]}
     * @protected
     */
    _routes

    /**
     * @param routes {Route[]}
     */
    constructor(routes) {
        this._routes = routes

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