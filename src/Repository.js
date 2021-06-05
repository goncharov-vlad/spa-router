/**
 * @param routes {Route[]}
 */
export default class Repository {
    constructor(routes) {
        this.routes = routes

    }

    /**
     * @param name
     * @returns {boolean|Route}
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
     * @returns {boolean|*}
     */
    findByPath(path) {
        for (let route of this.routes) {
            if (route.getUrlTemplate().pathMatch(path)) {
                return route

            }

        }

        return false

    }

}