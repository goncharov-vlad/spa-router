import Pipeline from "./src/Pipeline";
import Repository from "./src/Repository";
import Route from "./src/Route";

/**
 * @param repository {Repository}
 */
class Router {
    /**
     * @param routes {Route[]}
     */
    constructor(routes) {
        this.repository = new Repository(routes)

    }

    process() {
        let pipeline = new Pipeline()
        //When onpopstate is ran executes route action
        window.onpopstate = () => pipeline.onPopUp(this.repository)
        //Get all route elements from DOM
        let routeElements = document.querySelectorAll('[route]')
        //When a click to route
        if (routeElements.length) {
            for (let routeElement of routeElements) {
                routeElement.addEventListener('click', (event) => pipeline.onClick(event, routeElement, this.repository))

            }

        }
        //When a new route element in DOM
        let mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node instanceof Element && node.hasAttribute('route')) {
                        node.addEventListener('click', (event) => pipeline.onClick(event, this.repository))

                    }

                })

            })

        })

        mutationObserver.observe(document.body, {childList: true, subtree: true})
        //When page is load
        pipeline.onLoad(window.location.pathname, this.repository)

    }

}

export {Route}
export default Router
