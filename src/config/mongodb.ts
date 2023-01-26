interface MongoRequest {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "api-key": string
    },
    body: string
}

interface Filter {
    [key: string]: string | number
}

type Collection = 'city' | 'district' | 'ward' 

class MongoMethods {
    private static readonly BASE_URI: string = `${Deno.env.get('MONGO_URI')!}/action`
    private static readonly DATA_SOURCE: string = 'Cluster0'
    private static readonly DATABASE : string = Deno.env.get('DATABASE')!

    private options: MongoRequest = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": Deno.env.get('DATA_API_KEY')!
        },
        body: ''
    }


    public async findAll(collection: Collection) {
        try {
            const URI = `${MongoMethods.BASE_URI}/find` 
            const query = {
                collection: collection,
                database: MongoMethods.DATABASE,
                dataSource: MongoMethods.DATA_SOURCE,
                projection: {'_id': 0}
            }
            this.options.body = JSON.stringify(query)
            const dataResponse = await fetch(URI, this.options)
            const results = await dataResponse.json()

            if(results) {
                return results
            } else {
                throw new Error('Error')
            }
        // deno-lint-ignore no-unused-vars
        } catch (error) {
            throw new Error('Error')
        }
    }

    public async findAllById(collection: Collection, conditionFilter: Filter) {
        try {
            const URI = `${MongoMethods.BASE_URI}/find`
            const query = {
                collection: collection,
                database: MongoMethods.DATABASE,
                dataSource: MongoMethods.DATA_SOURCE,
                projection: {'_id': 0},
                filter: conditionFilter
            }
            this.options.body = JSON.stringify(query)
            const dataResponse = await fetch(URI, this.options)
            const results = await dataResponse.json()

            if(results) {
                return results
            } else {
                throw new Error('Error')
            }
        // deno-lint-ignore no-unused-vars
        } catch (error) {
            throw new Error('Error')
        }
    }
}

export default new MongoMethods

