import PathTemplate from "../PathTemplate/PathTemplate.js"

class Route {

    /**
     * @property {string}
     * @protected
     */
    _name

    /**
     * @property {_name}
     */
    get name() {
        return this._name

    }

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
     * @param name {*}
     * @param action {*}
     * @param pathTemplate {*}
     */
    constructor(pathTemplate, action, name) {
        if (name !== undefined && typeof name !== 'string') {
            throw new Error('Name of route must be string type')

        }

        if (action === undefined) {
            throw new Error('Specify action of route')

        }

        if (typeof action !== 'function') {
            throw new Error('Action of route must be function type')

        }

        this._name = name
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
        //Validates values
        this._pathTemplate.findPartsByType('value').forEach((part) => {
            if (!values.hasOwnProperty(part.name)) {
                throw new Error('Route "' + this._name + '" must has "' + part.name + '" value')

            }

        })

        this._action(values)

    }

}

export default Route
