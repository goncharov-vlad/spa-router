import Route from "../Route/Route.js";

class Repository {

    /**
     * @property {Route[]}
     * @protected
     */
    _routes

    /**
     * @param stack {{}[]}
     */
    constructor(stack) {
        if (stack === undefined) {
            throw new Error('Specify stack of routes')

        }

        if (!Array.isArray(stack)) {
            throw new Error('Stack of routes must be array type')

        }

        this._routes = []
        /**
         * @param item.templatePath {*}
         * @param item.action {*}
         */
        stack.forEach((item) => {
            if (!(item instanceof Object) || item instanceof Array) {
                throw new Error('Route must be object type')

            }

            let route = new Route(item.pathTemplate, item.action)

            if (this.findByPathTemplate(route.pathTemplate.template)) {
                throw new Error('Route path must be unique')

            }

            this._routes.push(route)

        })

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

    /**
     * @param pathTemplate {string}
     * @return {boolean|Route}
     */
    findByPathTemplate(pathTemplate) {
        for (let route of this._routes) {
            if (route.pathTemplate.template === pathTemplate) {
                return route

            }

        }

        return false

    }

}

export default Repository