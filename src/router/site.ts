import {Router} from 'https://deno.land/x/oak@v11.1.0/mod.ts'

const router = new Router()

router.get('/', (ctx) => {
    ctx.response.body = 'Location Info API';
})

router.get('/(.*)', (ctx) => {
    ctx.response.body = 'Not Found Service (404)';
})

export default router