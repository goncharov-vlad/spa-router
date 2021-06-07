import Route from "../Route";

export default class Pipeline {
    /**
     * @param repository {Repository}
     */
    onPopUp(repository) {
        let name = window.history.state.route.name
        let values = window.history.state.route.values

        let route = repository.findByName(name)

        route.execute(values, true)

    }

    /**
     * @param event {Event}
     * @param element {$ElementType}
     * @param repository {Repository}
     */
    onClick(event, element, repository) {
        event.preventDefault()

        let routeData = JSON.parse(element.getAttribute('route'))

        if (!routeData.name) {
            throw new Error('Route name is not specified')

        }

        if (routeData.values !== undefined && !(routeData.values instanceof Object)) {
            throw new Error('Route values must be json object')

        }

        let route = repository.findByName(routeData.name)

        if (!route) {
            throw new Error(`Route "${routeData.name}" not exists`)

        }

        if (window.history.state.route.name !== routeData.name) {
            route.execute(routeData.values)

        }

    }

    /**
     * @param path {string}
     * @param repository {Repository}
     */
    onLoad(path, repository) {
        let route = repository.findByPath(path)

        if (!route) {
            let notFoundRoute = repository.findByName('not-found')
            //If "not found" route is not defined then assign default "not found" route
            if (!notFoundRoute) {
                notFoundRoute = new Route('not-found', () => console.log('not found'), path)

            }

            route = notFoundRoute
        }

        //Fetch data from url
        let values = route.fetchPathValues(path)

        //Execute route with data
        route.execute(values, true)
    }

}