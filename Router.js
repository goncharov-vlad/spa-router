import Repository from "./src/Repository/Repository.js";

class Router {

    /**
     * @property {Repository}
     * @protected
     */
    _repository

    /**
     * @param config {Object}
     * @param config.notFoundAction {Function}
     * @param config.stack {Array.<Object>}
     */
    constructor(config) {
        if (config === undefined) {
            throw new Error('Define config')

        }

        if (!(config instanceof Object) || config instanceof Array) {
            throw new Error('Route must be object type')

        }

        //Defines not found action
        if (config.notFoundAction !== undefined) {
            if (typeof config.notFoundAction !== 'function') {
                throw new Error('Not found action must be function type')

            }

            this._notFoundAction = config.notFoundAction

        } else {
            this._notFoundAction = () => console.log('not-found')

        }

        this._repository = new Repository(config.stack)

        //When onpopstate is ran
        window.onpopstate = () => this.execute(window.location.pathname, true)
        //Gets all route elements from DOM
        let routeElements = document.querySelectorAll('a[href]')

        for (let routeElement of routeElements) {
            //When a click to route
            routeElement.addEventListener('click', (event) => this.onClickEvent(event, routeElement))

        }

        let mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node instanceof Element && node.tagName === 'A' && node.hasAttribute('href')) {
                        //When a new route element in DOM
                        node.addEventListener('click', (event) => this.onClickEvent(event, node))

                    }

                })

            })

        })

        mutationObserver.observe(document.body, {childList: true, subtree: true})

        this.execute(window.location.pathname, true)

    }

    /**
     * @param event {Event}
     * @param element {$ElementType}
     */
    onClickEvent(event, element) {
        let path = element.getAttribute('href').trim()

        if (
            path.substring(0, 7) === 'http://' ||
            path.substring(0, 8) === 'https://' ||
            path.substring(0, 6) === 'tcp://' ||
            path.substring(0, 6) === 'ftp://'
        ) {
            return

        }

        event.preventDefault()

        if (path[0] !== '/') {
            throw new Error('Route path must start from slash')

        }

        if (path === window.location.pathname) {
            return

        }

        this.execute(path)

    }

    /**
     * @param path {string}
     * @param replaceState {boolean}
     */
    execute(path, replaceState = false) {
        let action = this._notFoundAction
        let pathname = path

        let route = this._repository.findByPath(path)

        if (route) {
            let values = route.fetchPathValues(path)

            pathname = route.makePath(values)
            action = () => route.execute(values)

        }

        if (replaceState) {
            window.history.replaceState({}, '', pathname)

        } else {
            window.history.pushState({}, '', pathname)

        }

        action()

    }

}

export default Router
