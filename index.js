

module.exports = function (app) {
    function registerRoute(type, path, resource) {
        if (typeof resource === 'string') {
            throw new Error('We do not support controllers just yet!')
        }
        
        if (!path.startsWith('/')) {
            path = '/' + path;
        }
        
        app[type](path, (req, res, next) => {
            
            let response = resource(req, res, next);
            
            if (typeof response === 'object') {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(response));
            } else {
                res.send(response);    
            }
        });
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
        resource(path, resource) {
            if (typeof resource !== 'object') {
                throw new Error('Your resource MUST be an object')
            }
            get(path, resource.index);
            
            post(path, resource.store);
            
            put(path + '/:id', resource.update);
            
            delete(path + '/:id', resource.destroy);
            
            get(path + '/:id', resource.show);
        }
    }
}
