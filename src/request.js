import { RoutesKey } from "./controller"

export function Request({url, method, middleware=[]}) {
    return function (target, name, descriptor) {
        if(!name){
            console.warn('invalid usage of @Rquest', 'target is not a property')
            return
        }
        if(!target[RoutesKey]){
            target[RoutesKey] =  {
                prefix: '',
                children: []
            }
        }
        const routes = target[RoutesKey]
        descriptor = descriptor || Object.getOwnPropertyDescriptor(target, name)
        if(typeof descriptor.value !== 'function'){
            console.warn('invalid usage of @Rquest', 'descriptor is not function')
            return
        }
        const original = descriptor.value
        routes.children.push({
            handler: Object.assign(original.bind(target), {original}),
            method: method,
            url,
            middleware
        })
    }
}