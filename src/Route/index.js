import PathTemplate from "../PathTemplate"

class Route {

    /**
     * @property {string}
     * @protected
     */
    _name

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
     * @param name {string}
     * @param action {Function}
     * @param pathTemplate {string}
     */
    constructor(name, action, pathTemplate) {
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
