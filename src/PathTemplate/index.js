class PathTemplate {

    /**
     * @property {Part[]}
     * @protected
     */
    _parts

    /**
     * @param pathTemplate {string}
     */
    constructor(pathTemplate) {
        let handledPathTemplate = pathTemplate.trim()

        if (handledPathTemplate[0] !== '/') {
            throw new Error('Route path template must starts from slash')

        }

        let parts = []

        handledPathTemplate.split('/').forEach((part, index) => {
            let partName = part
            let partType = 'base'

            let firstSymbol = part[0]
            let lastSymbol = part[part.length - 1]

            if (firstSymbol === '{' && lastSymbol === '}') {
                partName = partName.substring(1).slice(0, -1)
                partType = 'value'

            }

            parts.push({
                'name': partName,
                'type': partType
            })

        })

        this._parts = parts

    }

    /**
     * @param path {string}
     * @return {{}}
     */
    fetchPathValues(path) {
        let values = {}

        path.split('/').forEach((part, index) => {
            let templatePart = this.findPartByIndex(index)

            if (templatePart && templatePart.type === 'value') {
                values[templatePart.name] = part

            }

        })

        return values

    }

    /**
     * @param index {number}
     * @return {boolean|Part}
     */
    findPartByIndex(index) {
        let part = this._parts[index]

        if (part) {
            return part

        }

        return false

    }

    /**
     * @param type {string}
     * @return {Part[]}
     */
    findPartsByType(type) {
        let parts = []

        this._parts.forEach((part) => {
            if (part.type !== type) {
                return

            }

            parts.push(part)

        })

        return parts
    }

    /**
     * @param values {{}}
     * @return {string}
     */
    makePath(values) {
        let pathPart = []

        this._parts.forEach((part) => {
            pathPart.push(part.type === 'value' ? values[part.name] : part.name)

        })

        return pathPart.join('/')

    }

    /**
     * @param path {string}
     * @return {boolean}
     */
    pathMath(path) {
        let pathParts = path.split('/')

        if (pathParts.length !== this._parts.length) {
            return false

        }

        let result = false;

        pathParts.forEach((part, index) => {
            let templatePart = this.findPartByIndex(index)

            if (templatePart === false) {
                return

            }

            if (templatePart.type === 'value') {
                return

            }

            result = part === templatePart.name

        })

        return result

    }

}

export default PathTemplate