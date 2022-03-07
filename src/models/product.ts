// @ts-ignore
import Client from '../database'

export type Products = {
     id?: Number;
     name: String;
     price: number;
     category?: string;
}

export class ProductStores {
  async index(): Promise<Products[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'
  
      const result = await conn.query(sql)
  
      conn.release()
  
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Products> {
    try {
    const sql = 'SELECT * FROM products WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  async create(p: Products): Promise<Products> {
      try {
    const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    // category is optional
    const category = p.category ?? null

    const result = await conn
        .query(sql, [p.name, p.price, category])

    const book = result.rows[0]

    conn.release()

    return book
      } catch (err) {
          throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
      }
  }
}