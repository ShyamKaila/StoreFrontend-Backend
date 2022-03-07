// @ts-ignore
import Client from '../database'
import {Products} from '../models/product'
import {Orders} from '../models/order'

export class DashboardQuery{
    async productByCategory(category: String): Promise<Products[]>{
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE category = ($1)';

            const result = await conn.query(sql, [category]);
            conn.release();

            return result.rows
        }
        catch(err){
            throw new Error(`unable get products by category ${category}: ${err}`)
        }
    }


    async orderByUserId(userId: number): Promise<Orders[]>{
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders where user_id = ($1)';

            const result = await conn.query(sql, [userId]);
            conn.release();

            return result.rows
        }
        catch(err){
            throw new Error(`unable get orders by userID ${userId}: ${err}`)
        }
    }


    async completedOrderByUserId(userId: number): Promise<Orders[]>{
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders where user_id = ($1) AND status = \'complete\'';

            const result = await conn.query(sql, [userId]);
            conn.release();

            return result.rows
        }
        catch(err){
            throw new Error(`unable get completed orders by userID ${userId}: ${err}`)
        }
    }

    async fiveMostPopularProduct(): Promise<Products[]>{
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT name, price, category, SUM(quantity) FROM products INNER JOIN order_products ON products.id = order_products.product_id GROUP BY products.id ORDER BY SUM(quantity) DESC LIMIT 5';

            const result = await conn.query(sql);
            conn.release();

            return result.rows
        }
        catch(err){
            throw new Error(`unable get five most popular products: ${err}`)
        }
    }
}