

module.exports = function (app, handler) {
    function registerRoute(type, path, resource, middleware) {
        if (typeof resource === 'string') {
            throw new Error('We do not support controllers just yet!')
        }
        
        if (!path.startsWith('/')) {
            path = '/' + path;
        }
        
        let requestHandler = handler || ((type, path, resource) => {
            let resolve = (req, res, next) => {
                
                let response = resource(req, res, next);
                
                if (typeof response === 'object') {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(response));
                } else {
                    res.send(response);    
                }
            };
            
            if (middleware) {
                app[type](path, middleware, resolve);
            } else {
                app[type](path, resolve);
            }
        })
        
        requestHandler(type, path, resource, middleware);
    }
        
    function get(path, resource, middleware) {
        registerRoute('get', path, resource, middleware);
    }
        
    function post(path, resource, middleware) {
        registerRoute('post', path, resource, middleware);
    }
        
    function put(path, resource, middleware) {
        registerRoute('put', path, resource, middleware);
    }
        
    function patch(path, resource, middleware) {
        registerRoute('patch', path, resource, middleware);
    }
    
    function destroy(path, resource, middleware) {
        registerRoute('delete', path, resource, middleware);
    }
    

    return {
        get,
        patch,
        'delete': destroy,
        put,
        post, 
        registerRoute,
        resource(path, resource, routeParam) {
            if (typeof resource !== 'object') {
                throw new Error('Your resource MUST be an object')
            }
            
            routeParam = routeParam || ':id';
            
            get(path, resource.index);
            
            post(path, resource.store);
            
            put(path + '/' + routeParam, resource.update);
            
            destroy(path + '/' + routeParam, resource.destroy);
            
            get(path + '/' + routeParam, resource.show);
        }
    }
}
