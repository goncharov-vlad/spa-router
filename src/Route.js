class Route {
    /**
     * @param name {string}
     * @param action {function}
     * @param url {string}
     */
    constructor(name, action, url = '') {
        this.url = url
        this.action = action
        this.name = name

    }

}

export default Route