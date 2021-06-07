import PathTemplate from "../PathTemplate"

/**
 * Basic route
 *
 * @param name {string}
 * @param pathTemplate {string}
 * @param action {Function}
 */
export default class Route {
    /**
     * @param name {string}
     * @param action {Function}
     * @param pathTemplateString {string}
     */
    constructor(name, action, pathTemplateString) {
        this.action = action
        this.name = name
        this.pathTemplate = new PathTemplate(pathTemplateString)

    }

    /**
     * @param path {string}
     * @return Object
     */
    fetchPathValues(path) {
        let values = {}

        path.split('/').forEach((part, index) => {
            let partPathTemplate = this.pathTemplate.findPartByIndex(index)

            if (partPathTemplate && partPathTemplate.getType() === 'value') {
                values[partPathTemplate.getName()] = part

            }

        })

        return values

    }

    /**
     * @param path {string}
     * @return boolean
     */
    pathMatch(path) {
        let pathParts = path.split('/')

        if (pathParts.length !== this.pathTemplate.parts.length) {
            return false

        }

        let result = false;

        pathParts.forEach((part, index) => {
            let pathTemplatePart = this.pathTemplate.findPartByIndex(index)

            if (pathTemplatePart === false) {
                return

            }

            if (pathTemplatePart.getType() === 'value') {
                return

            }

            result = part === pathTemplatePart.getName()

        })

        return result

    }

    execute(values, replaceState = false) {
        this.pathTemplate.findPartsByType('value').forEach((part) => {
            if (!values.hasOwnProperty(part.getName())) {
                throw new Error('Route "' + this.name + '" must has "' + part.getName() + '" value')

            }

        })

        this.action(values)

        let state = {
            'route': {
                'name': this.name,
                'values': values

            }
        }

        if (replaceState) {
            window.history.replaceState(state, this.name, window.location.pathname)

        } else {
            window.history.pushState(state, this.name, this.pathTemplate.makePath(values))

        }

    }

}
