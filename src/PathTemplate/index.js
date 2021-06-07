import Part from './src/Part'

/**
 * @param parts {Part[]}
 */
export default class PathTemplate {
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

            parts.push(new Part(partName, partType))

        })

        this.parts = parts

    }

    /**
     * @param index
     * @return boolean|Part
     */
    findPartByIndex(index) {
        let part = this.parts[index]

        if (part) {
            return part

        }

        return false

    }

    /**
     * @param type {string}
     * @return Part[]
     */
    findPartsByType(type) {
        let parts = []

        this.parts.forEach((part) => {
            if (part.getType() !== type) {
                return

            }

            parts.push(part)

        })

        return parts
    }

    /**
     * @param values {{}}
     * @return string
     */
    makePath(values) {

        let pathPart = []
        this.parts.forEach((part) => {
            let type = part.getType()
            let name = part.getName()

            pathPart.push(type === 'value' ? values[name] : name)

        })

        return pathPart.join('/')

    }

}