import express, { Request, Response } from 'express'
import { DashboardQuery } from '../services/dashboard'
import verifyToken from '../middleware/auth'


const DashboardRoute = (app: express.Application) => {
    app.get('/products-by-category', productByCategory)
    app.get('/order-by-userid',verifyToken, orderByUserId)
    app.get('/complete-order-by-userid', verifyToken, completedOrderByUserId)
    app.get('/five-most-popular-product', fiveMostPopularProducts)
  }

const dashboard = new DashboardQuery();

const productByCategory = async (_req:Request, res: Response) => {
    try{
        const products = await dashboard.productByCategory(_req.body.category);
    res.json(products);
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
}

const orderByUserId = async (_req:Request, res: Response) => {
    try{
    const orders = await dashboard.orderByUserId(_req.body.user_id);
    res.json(orders);
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
}

const completedOrderByUserId = async (_req:Request, res: Response) => {
    try{
    const orders = await dashboard.completedOrderByUserId(_req.body.user_id);
    res.json(orders);
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
}

const fiveMostPopularProducts = async (_req:Request, res: Response) => {
    try{
    const products = await dashboard.fiveMostPopularProduct();
    res.json(products);
    }
    catch(err){
        res.status(400)
        res.json(err)
    }
}

export default DashboardRoute