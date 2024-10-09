class EventEmitter {
    constructor() {
        this._events = Object.create(null);
    }

    addEventListener(type, listener) {
        if(this._events[type]) {
            this._events[type].push(listener);
        } else {
            this._events[type] = [listener];
        }
    }

    removeListener(type, listener) {
        if(Array.isArray(this._events[type])) {
            if(!listener) {
                delete this._events[type];
            } else {
                this._events[type] = this._events[type].filter(item => item !== listener);
            }
        }
    }

    emit(type, ...args) {
        if(Array.isArray(this._events[type])) {
            this._events[type].forEach(fn => {
                fn.apply(this, args)
            });
        }
    }
}