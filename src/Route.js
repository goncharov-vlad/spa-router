import UrlTemplate from "./UrlTemplate"

/**
 * Basic route
 *
 * @param name {string} Identifying name
 * @param url {string} Url address
 * @param urlItems {Object[]} Url items
 * @param action {Function} Executing action
 */
class Route {
    /**
     * @param name {string}
     * @param action {Function}
     * @param urlTemplate
     */
    constructor(name, action, urlTemplate = '') {
        this.urlTemplate = new UrlTemplate(urlTemplate)
        this.action = action
        this.name = name

    }

    /**
     * @returns {string}
     */
    getName() {
        return this.name

    }

    /**
     * @returns {Function}
     */
    getAction() {
        return this.action

    }

    /**
     * @returns {UrlTemplate}
     */
    getUrlTemplate() {
        return this.urlTemplate

    }

}

export default Route