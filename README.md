# koa sample decorator
ES7 decorators for koa-router

## Usage
### Example
> middleware.js
```js
export default async fucntion auth(ctx, next){
    const token = ctx.get('token')
    // verify
    next()
}
```
> controller.js
```js
import {Controller, RequestMethod, Request }form 'koa-sample-router'
import auth from './middleware'
@Controller({prefix: '/user'})
class userController {
    constructor(){
        //
    }

    @Request({url: '/login' , method: RequestMethod.POST})
    async login(ctx){
        const user = ctx.request.body.user
        const password = ctx.request.body.password
        // ...
    }

    @Request({url: '/get-users', method: ReQuestMehod.GET, middleware: [auth] })
    async getUser(ctx) {
        // todo
    }
}
export default new userController()
```

> app.js
```js
import Koa from 'koa'
import KoaRoute from 'koa-router'
import {injectAllRoutes} from 'koa-sample-router'
// import controller
import './controller'
const router = new KoaRoute({prefix: '/api'})
injectAllRoutes(router)
const app = new Koa()
app.use(router.routes())
app.listen()
```
