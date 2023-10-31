import { AppDataSource } from "../data-source"

export const datasource = AppDataSource.initialize().then(async () => {

    console.log('Database Connected...')
    

}).catch(error => console.log('General Error '+error))
