import PathTemplate from "../PathTemplate/PathTemplate.js"

class Route {

    /**
     * @property {Function}
     * @protected
     */
    _action

    /**
     * @property {PathTemplate}
     * @protected
     */
    _pathTemplate

    /**
     * @property {_pathTemplate}
     */
    get pathTemplate() {
        return this._pathTemplate

    }

    /**
     * @param action {*}
     * @param pathTemplate {*}
     */
    constructor(pathTemplate, action) {
        if (action === undefined) {
            throw new Error('Specify action of route')

        }

        if (typeof action !== 'function') {
            throw new Error('Action of route must be function type')

        }

        this._action = action
        this._pathTemplate = new PathTemplate(pathTemplate)

    }

    /**
     * @param path {string}
     * @return {{}}
     */
    fetchPathValues(path) {
        return this._pathTemplate.fetchPathValues(path)

    }

    /**
     * @param path {string}
     * @return {boolean}
     */
    pathMatch(path) {
        return this._pathTemplate.pathMath(path)

    }

    /**
     * @param values {{}}
     * @return {string}
     */
    makePath(values) {
        return this._pathTemplate.makePath(values)

    }

    /**
     * @param values {{}}
     */
    execute(values) {
        this._action(values)

    }

}

export default Route