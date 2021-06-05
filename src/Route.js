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

    execute(values, replaceState = false) {
        this.action(values)

        let state = {
            'route': {
                'name': this.name,
                'values': values

            }
        }

        if (replaceState) {
            window.history.replaceState(state, 'name', '/' + this.urlTemplate.replaceRouteUrlTemplateItemsWithValues(values))

        } else {
            window.history.pushState(state, 'name', '/' + this.urlTemplate.replaceRouteUrlTemplateItemsWithValues(values))

        }

    }

}

export default Route