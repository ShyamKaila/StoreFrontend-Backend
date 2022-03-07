import express, { Request, Response } from 'express'
import { Users, UserStores } from '../models/user'
import jwt from 'jsonwebtoken'
import verifyToken, {RequestCustom} from '../middleware/auth'

const store = new UserStores()

const create = async (req: Request, res: Response) => {
    try {
        const user: Users = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        }

        const newUser = await store.create(user)

        var token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET!)

        res.json({'token': token})
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
  }
  
const show = async (req: Request, res: Response) => {
    try {
        const customReq = req as RequestCustom
        const user = await store.show(req.params.id)
        res.json(user)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
  }

const authenticate = async (req: Request, res: Response) => {
    try {
        const user: Users = {
            username: req.body.username,
            password: req.body.password
        }

        const authUser = await store.authenticate(user.username, user.password)
        var token = jwt.sign({user: authUser}, process.env.TOKEN_SECRET!)
        res.json({'token': token})
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const userRoutes = (app:express.Application) => {
    app.post('/users', create)
    app.get('/users', verifyToken, index )
    app.get('/users/:id', verifyToken, show )
    app.post('/authenticate', authenticate)
}

export default userRoutes