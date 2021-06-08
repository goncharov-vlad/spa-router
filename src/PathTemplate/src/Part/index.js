class Part {

    /**
     * @property {string}
     * @protected
     */
    _name

    /**
     * @property {string}
     * @protected
     */
    _type

    /**
     * @param name {string}
     * @param type {string}
     */
    constructor(name, type) {
        this._name = name
        this._type = type

    }

    /**
     * @property {_name}
     */
    get type() {
        return this._type

    }

    /**
     * @property {_name}
     */
    get name() {
        return this._name

    }

}

export default Part