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
        let routeElements = document.querySelectorAll('[route]')

        for (let routeElement of routeElements) {
            //When a click to route
            routeElement.addEventListener('click', (event) => this.onClickEvent(event, routeElement))

        }

        let mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node instanceof Element && node.hasAttribute('route')) {
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
        event.preventDefault()

        let path = element.getAttribute('route')

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
