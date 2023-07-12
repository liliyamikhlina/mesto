class Section {
    constructor({ items, renderer }, selector) {
        this._items = items;
        this._renderer = renderer;
        this._selector = selector;
        this._container = document.querySelector(this._selector);
    }
    render() {
        this._items.forEach(this._renderer);
    };

    addItem(el) {
        this._container.append(el);
    }
}