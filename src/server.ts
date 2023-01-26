import {Application} from "https://deno.land/x/oak@v11.1.0/mod.ts"
import { RateLimiter } from "https://deno.land/x/oak_rate_limit@v0.1.1/mod.ts";
import 'https://deno.land/std@0.174.0/dotenv/load.ts';
import route from './router/index.ts'

const app = new Application()

// Logger
app.use(async(ctx, next) => {
    await next()
    const rt = ctx.response.headers.get('X-Response-Time')
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
})

// Timming
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.response.headers.set('X-Response-Time', `${ms}ms`)
})

const rateLimit = RateLimiter({
  windowMs: 1000, // Window for the requests that can be made in miliseconds.
  max: Number(Deno.env.get('RATE_LIMIT')!)  || 10, // Max requests within the predefined window.
  headers: true, // Default true, it will add the headers X-RateLimit-Limit, X-RateLimit-Remaining.
  message: "Too many requests, please try again later.", // Default message if rate limit reached.
  statusCode: 429, // Default status code if rate limit reached.
});

app.use(await rateLimit);

// Router
route(app)

await app.listen({port: 5000})
