
export const routerList = []
export const RoutesKey = Symbol('routes')

export function Controller({prefix}) {
    return function (target) {
        target.prototype[RoutesKey].prefix = prefix
        routerList.push(target.prototype[RoutesKey])
    }
}