/**
 * @param routes {Route[]}
 */
export default class Repository {
    constructor(routes) {
        this.routes = routes

    }

    /**
     * @param name
     * @return boolean|Route
     */
    findByName(name) {
        for (let route of this.routes) {
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
        for (let route of this.routes) {
            if (route.pathMatch(path)) {
                return route

            }

        }

        return false

    }

}