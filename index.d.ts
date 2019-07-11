declare module '@kbco/router' {
    export interface IRouter {
        registerRoute(type: string, path: string, resource: any, middleware: any): void;
        get(path: string, resource: any, middleware: any): void;
        post(path: string, resource: any, middleware: any): void;
        put(path: string, resource: any, middleware: any): void;
        patch(path: string, resource: any, middleware: any): void;
        delete(path: string, resource: any, middleware: any): void;
        middleware(middleware: any): void;
        resource(path: string, resource: any, routeParam: string): void;
    }
}
