export default class Route {
    url
    action
    name

    constructor(url, action, name = '') {
        this.url = url
        this.action = action
        this.name = name

    }

}
