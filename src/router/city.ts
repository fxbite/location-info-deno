import {Router} from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import mongoMethods from '../config/mongodb.ts'

const router = new Router()

interface City {
    documents: [
        {
            '_id': string,
            'city_id': string,
            name: string,
            type: string
        }
    ]
}

function isValidCity(object: unknown): object is City {
    if(object !== null && typeof object === 'object') {
        return true
    }
    return false
}

router.get('/city', async(ctx) => {
    try {
        const cityResult: unknown = await mongoMethods.findAll('city')
        if(!isValidCity(cityResult)) {
            return ctx.response.body = {}
        }
        const resultResponse = {
            data: cityResult.documents,
            total: cityResult.documents.length
        }
        ctx.response.headers.set("Cache-Control", "max-age=3600")
        ctx.response.body = resultResponse
    // deno-lint-ignore no-unused-vars
    } catch (error) {
        ctx.response.status = 500
        ctx.response.body = 'Something went wrong!';
    }
})

export default router