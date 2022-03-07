import express, { Request, Response } from 'express'
import { Products, ProductStores } from '../models/product'
import verifyToken, {RequestCustom} from '../middleware/auth'

const store = new ProductStores();


const create = async (_req: Request, res: Response) => {
    try {
        const product: Products = {
            name: _req.body.name,
            price: _req.body.price,
            category: _req.body.category ?? null
        }
        const newOrder = await store.create(product)

        res.json(newOrder)
    } catch(err) {
        console.log(err)
        res.status(400)
        res.json(err)
    }
}

const index = async (_req: Request, res: Response) => {
    try {
    const products = await store.index()
    res.json(products)
    } catch(err) {
        console.log(err)
        res.status(400)
        res.json(err)
    }
  }
  
const show = async (req: Request, res: Response) => {
    try{
        const customReq = req as RequestCustom
        const product = await store.show(req.params.id)
        res.json(product)
        }catch(err){
            res.send(err)
        }
  }

const ProductRoutes = (app: express.Application) => {
    app.post('/products',verifyToken, create)
    app.get('/products', index)
    app.get('/products/:id',show)
  }

export default ProductRoutes