class Router {
    constructor(app, handler) {
        this.app = app;
        this.handler = handler;
        this.pMiddleware = null;
    }

    registerRoute(type, path, resource, middleware) {
        if (typeof resource === 'string') {
            throw new Error('We do not support controller strings just yet!')
        }

        if (!path.startsWith('/')) {
            path = '/' + path;
        }

        let requestHandler = this.handler || ((type, path, resource) => {
            let resolve = async (req, res, next) => {

                let response = await resource(req, res, next);

                if (typeof response === 'object') {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(response));
                } else {
                    res.send(response);
                }
            };

            if (middleware || this.pMiddleware) {
                this.app[type](path, middleware || this.pMiddleware, resolve);
                this.pMiddleware = null;
            } else {
                this.app[type](path, resolve);
            }
        })

        requestHandler(type, path, resource, middleware);

        return this;
    }

    get() {
        let {path, resource, middleware} = this._getActualParamsFromUrl(arguments);
        this.registerRoute('get', path, resource, middleware);
        return this;
    }

    post() {
        let {path, resource, middleware} = this._getActualParamsFromUrl(arguments);
        this.registerRoute('post', path, resource, middleware);
        return this;
    }

    put() {
        let {path, resource, middleware} = this._getActualParamsFromUrl(arguments);
        this.registerRoute('put', path, resource, middleware);
        return this;
    }

    patch() {
        let {path, resource, middleware} = this._getActualParamsFromUrl(arguments);
        this.registerRoute('patch', path, resource, middleware);
        return this;
    }

    delete() {
        let {path, resource, middleware} = this._getActualParamsFromUrl(arguments);
        this.registerRoute('delete', path, resource, middleware);
        return this;
    }

    middleware(middleware) {
        this.pMiddleware = middleware;
        return this;
    }

    _getMiddleware() {
        return this.pMiddleware;
    }

    /*
     * If I'm totally honest, this is likely to be a big breaking change.
     * I did test it pretty intensively, but of course I can't test everything...
     */
    _getActualParamsFromUrl(argument) {
        let possiblePat = argument[0];

        if (possiblePat.hasOwnProperty('path')) {
            var {path, resource, middleware} = possiblePat;
        } else {
            var path = argument[0]
            var resource = argument[1]
            var middleware = argument[2];
        }

        return {
            path,
            resource,
            middleware
        }
    }

    resource(path, resource, routeParam) {
        if (typeof resource !== 'object') {
            throw new Error('Your resource MUST be an object')
        }

        routeParam = routeParam || ':id';

        let middleware = this._getMiddleware()

        this.get(path, resource.index, middleware);

        this.post(path, resource.store, middleware);

        this.put(path + '/' + routeParam, resource.update, middleware);
        this.patch(path + '/' + routeParam, resource.update, middleware);

        this.delete(path + '/' + routeParam, resource.destroy, middleware);

        this.get(path + '/' + routeParam, resource.show, middleware);

        return this;
    }
}

module.exports = function (app, handler) {
    let classRouter = new Router(app, handler);

    return classRouter
}
