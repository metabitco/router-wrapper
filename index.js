

module.exports = function (app, handler) {
    function registerRoute(type, path, resource) {
        if (typeof resource === 'string') {
            throw new Error('We do not support controllers just yet!')
        }
        
        if (!path.startsWith('/')) {
            path = '/' + path;
        }
        
        let requestHandler = handler || ((type, path, resource) => {
            app[type](path, (req, res, next) => {
                
                let response = resource(req, res, next);
                
                if (typeof response === 'object') {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(response));
                } else {
                    res.send(response);    
                }
            });
        })
        
        requestHandler(type, path, resource);
    }
        
    function get(path, resource) {
        registerRoute('get', path, resource);
    }
        
    function post(path, resource) {
        registerRoute('post', path, resource);
    }
        
    function put(path, resource) {
        registerRoute('put', path, resource);
    }
        
        
    function patch(path, resource) {
        registerRoute('patch', path, resource);
    }
    

    return {
        get,
        patch,
        delete(path, resource) {
            registerRoute('delete', path, resource);
        },
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
            
            delete(path + '/' + routeParam, resource.destroy);
            
            get(path + '/' + routeParam, resource.show);
        }
    }
}
