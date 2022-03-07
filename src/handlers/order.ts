import express, { Request, Response } from 'express'
import { Orders, OrderStores } from '../models/order'
import verifyToken from '../middleware/auth'

const store = new OrderStores();

const create = async (_req: Request, res: Response) => {
    try {
        const order: Orders = {
            status: _req.body.status,
            user_id: _req.body.user_id
        }
        const newOrder = await store.create(order)

        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index()
    res.json(orders)
  } catch(err) {
    res.status(400)
    res.json(err)
}
  }
  
  
  const show = async (req: Request, res: Response) => {
    try {
     const order = await store.show(req.params.id)
     res.json(order)
    } catch(err) {
      res.status(400)
      res.json(err)
  }
  }

const OrderRoute = (app: express.Application) => {
    app.post('/orders',verifyToken, create)
    app.get('/orders', verifyToken ,index)
    app.get('/orders/:id',verifyToken, show)
    app.post('/orders/:id/products',verifyToken, addProducts)
  }

const addProducts = async (_req: Request, res: Response) => {
    const order_id: string = _req.params.id
    const product_id: string = _req.body.product_id
    const quantity: number = parseInt(_req.body.quantity)
  
    try {
      const addedProduct = await store.addProduct(quantity, order_id, product_id)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
}

export default OrderRoute