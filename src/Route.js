/**
 * @class Route Basic route
 *
 * @param name {string} Identifying name
 * @param url {string} Url address
 * @param urlItems {[]}
 * @param action {Function} Executing action
 */
class Route {
    /**
     * @param name {string}
     * @param action {Function}
     * @param url {string}
     */
    constructor(name, action, url = '') {
        this.url = url
        this.action = action
        this.name = name
        this.urlItems = []

        this.fetchUrlItems()

    }

    /**
     *
     * @param url {string}
     */
    fetchUrlItems(url = this.url) {
        let item = url.substring(
            url.lastIndexOf("{") + 1,
            url.lastIndexOf("}")
        )

        if (item) {
            this.urlItems.push(item.trim())

            this.fetchUrlItems(url.replace('{' + item + '}', ''))

        }

    }

    isRoutePath(path) {
        let pathParts = path.split('/')

        let urlParts = this.url.split('/')

        let convertedPath = path;

        urlParts.forEach((item, index) => {
            let urlItem = item.substring(
                item.lastIndexOf("{"),
                item.lastIndexOf("}") + 1
            )

            if (urlItem) {
                convertedPath = convertedPath.replace(pathParts[index], urlItem)

            }

        })

        return this.url === convertedPath

    }

    fetchDataFromUrl(currentUrl) {
        let data = {}

        let currentUrlParts = currentUrl.split('/')

        let urlParts = this.url.split('/')

        currentUrlParts.forEach((item, index) => {
            let urlItem = urlParts[index].substring(
                urlParts[index].lastIndexOf("{") + 1,
                urlParts[index].lastIndexOf("}")
            )

            if (urlItem) {
                data[urlItem] = item

            }

        })

        return data

    }

    makeUrlFromValues(routeValues) {
        let url = this.url

        let urlParts = url.split('/')

        urlParts.forEach((item, index) => {
            let urlItem = item.substring(
                item.lastIndexOf("{") + 1,
                item.lastIndexOf("}")
            )

            if (urlItem) {
                url = url.replace('{' + urlItem + '}', routeValues[urlItem])

            }

        })

        return url

    }

}

export default Route