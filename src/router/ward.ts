import {Router} from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import mongoMethods from '../config/mongodb.ts'

const router = new Router()

interface Ward {
    documents: [
        {
            '_id': string,
            'ward_id': string,
            name: string,
            type: string,
            'city_id': string,
            'city_name': string,
            'district_id': string,
            'district_name': string
        }
    ]
}

function isValidWard(object: unknown): object is Ward {
    if(object !== null && typeof object === 'object') {
        return true
    }
    return false
}

router.get('/ward', ctx => {
    ctx.response.status = 400
    ctx.response.body = 'District ID not provided';
})

router.get('/ward/:districtId', async(ctx) => {
    try {
        if(!ctx.params.districtId) {
            return;
        }
        const districtId = ctx.params.districtId
        const filter = { 'district_id': districtId }
        const wardResult: unknown = await mongoMethods.findAllById('ward', filter)
        if(!isValidWard(wardResult)) {
            return ctx.response.body = {}
        }
        const resultResponse = {
            data: wardResult.documents,
            total: wardResult.documents.length
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