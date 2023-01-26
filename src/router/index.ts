import {Application} from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import cityRouter from './city.ts'
import districtRouter from './district.ts'
import wardRouter from './ward.ts'
import siteRouter from './site.ts'

const route = (app: Application) => {
    app.use(cityRouter.routes(), cityRouter.allowedMethods())
    app.use(districtRouter.routes(), districtRouter.allowedMethods())
    app.use(wardRouter.routes(), wardRouter.allowedMethods())
    app.use(siteRouter.routes(), siteRouter.allowedMethods())
}

export default route