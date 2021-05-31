/**
 * Handles url template string
 *
 * @param template {string} route url template
 * @param templateParts{string[]} separated parts of template
 * @param templateItems{string[]}
 */
class UrlTemplate {
    /**
     * @param path {string}
     */
    constructor(path) {
        this.template = this.preparePath(path)
        this.templateParts = this.template.split('/')
        this.templateItems = this.fetchTemplateItems()

    }

    /**
     * @returns {string}
     */
    getTemplate() {
        return this.template

    }

    /**
     * @returns {string[]}
     */
    getTemplateParts() {
        return this.templateParts

    }

    /**
     * @returns {string[]}
     */
    getTemplateItems() {
        return this.templateItems

    }

    /**
     * Prepares path for next using
     *
     * @private
     *
     * @param path {string}
     * @returns {string}
     */
    preparePath(path) {
        let preparedTemplate = path.trim()

        let firstSymbol = preparedTemplate[0]
        let lastSymbol = preparedTemplate[preparedTemplate.length - 1]

        if (firstSymbol === '/') {
            preparedTemplate = preparedTemplate.substring(1)

        }

        if (lastSymbol === '/') {
            preparedTemplate = preparedTemplate.slice(0, -1)

        }

        return preparedTemplate

    }

    /**
     * @private
     *
     * @returns {string[]}
     */
    fetchTemplateItems() {
        let items = []

        this.templateParts.forEach((part) => {
            if (this.isItem(part)) {
                let itemName = part.substring(1).slice(0, -1)

                items.push(itemName)

            }

        })

        return items

    }

    /**
     * @private
     *
     * @param string {string}
     */
    isItem(string) {
        if (!string) {
            return false

        }

        let firstSymbol = string[0]
        let lastSymbol = string[string.length - 1]

        return firstSymbol === '{' && lastSymbol === '}'

    }

    /**
     * Checks if path is matched with url template
     *
     * @param path {string}
     *
     * @returns boolean
     */
    pathMatch(path) {
        let preparedPath = this.preparePath(path)

        if (preparedPath === this.template) {
            return true

        }

        let math = false;

        preparedPath.split('/').forEach((part, index) => {
            if (!this.isItem(this.templateParts[index])) {
                math = this.templateParts[index] === part

            }

        })

        return math

    }

    /**
     * Fetch data from url
     *
     * @returns {{}}
     * @param path
     */
    fetchRouteDataFromPath(path) {
        let data = {}

        let preparedPath = this.preparePath(path)

        preparedPath.split('/').forEach((part, index) => {
            if (this.isItem(this.templateParts[index])) {
                data[this.templateParts[index].substring(1).slice(0, -1)] = part

            }

        })

        return data

    }

    /**
     * Makes url of the route by using passed values in action
     *
     * @returns {string}
     * @param values
     */
    replaceRouteUrlTemplateItemsWithValues(values) {
        let url = this.template

        this.template.split('/').forEach((part, index) => {
            if (this.isItem(part)) {
                url = url.replace(part, values[this.templateParts[index].substring(1).slice(0, -1)])

            }

        })

        return url

    }

}

export default UrlTemplate