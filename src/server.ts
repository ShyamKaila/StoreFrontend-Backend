import express, { Request, Response } from 'express'
import user_routes from './handlers/user'
import order_routes from './handlers/order'
import product_routes from './handlers/product'
import dashboard_routes from './handlers/dashboard'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(express.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

user_routes(app);

order_routes(app);

product_routes(app);

dashboard_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;
