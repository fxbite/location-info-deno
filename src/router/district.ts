import {Router} from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import mongoMethods from '../config/mongodb.ts'

const router = new Router()

interface District {
    documents: [
        {
            '_id': string,
            'district_id': string,
            name: string,
            type: string,
            'city_id': string,
            'city_name': string
        }
    ]
}

function isValidDistrict(object: unknown): object is District {
    if(object !== null && typeof object === 'object') {
        return true
    }
    return false
}

router.get('/district', ctx => {
    ctx.response.status = 400
    ctx.response.body = 'City ID not provided';
})

router.get('/district/:cityId', async(ctx) => {
    try {
        if(!ctx.params.cityId) {
            return;
        }
        const cityId = ctx.params.cityId
        const filter = { 'city_id': cityId }
        const districtResult: unknown = await mongoMethods.findAllById('district', filter)
        if(!isValidDistrict(districtResult)) {
            return ctx.response.body = {}
        }
        const resultResponse = {
            data: districtResult.documents,
            total: districtResult.documents.length
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