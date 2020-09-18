import KoaRouter from 'koa-router'
import Controller, { routerList } from './controller'
import Request from './request'
const RequestMethod = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
}

export function injectAllRoutes(router){
    while(routerList.length){
        const route = routerList.shift()
        const option = {}
        if(route.prefix){
            option.prefix = route.prefix
        }
        const router_ = new KoaRouter(option)
        route.children.forEach(({handler, method, url, middleware})=>{
            router_[method](url, ...middleware, handler)
        })
        router.use(router_.routes())
    }
}


export {
    Controller,
    Request,
    RequestMethod
}