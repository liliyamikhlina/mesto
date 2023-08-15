export default class Section {
    constructor({ renderer }, selector) {
        this._renderer = renderer;
        this._selector = selector;
        this._container = document.querySelector(this._selector);
    }

    render(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }

    appendItem(item) {
        this._container.append(item);
    }

    prependItem(item) {
        this._container.prepend(item);
    }
}