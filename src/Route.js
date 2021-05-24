class Route {
    /**
     * Identifying name
     *
     * @param name
     */
    name

    /**
     * Url address
     *
     * @param url
     */
    url

    /**
     * Executing action
     *
     * @action action
     */
    action

    /**
     * Basic route
     *
     * @param name {string}
     * @param action {Function}
     * @param url {string}
     */
    constructor(name, action, url = '') {
        this.url = url
        this.action = action
        this.name = name

    }

}

export default Route