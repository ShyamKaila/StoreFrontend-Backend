import supertest from 'supertest';
import Clinte from '../../database';
import app from '../../server';
import {ProductStores, Products} from '../../models/product';
import {UserStores , Users} from '../../models/user';

const productStore = new ProductStores();
const userStore = new UserStores();
const request = supertest(app);
let token = '';

describe('PRODUCT API Endpoints', () => {
	const newUser = {
		username: 'userTesting',
		firstname: 'Ahmed',
		lastname: 'Sabry',
		password: 'test123',
	}  as Users;

	const newP = {
		name: 'T-shirt 1',
		price: 20.22,
		category: 'mens clothes',
	} as Products;

		describe('==> CREATE / ROUTE', () => {
			it(' RETURN STATUS(200) and NEW PRODUCT', async () => {
				const createP = await request
					.post('/products/')
					.set({
						'Content-type': 'application/json',
						Authorization: 'Bearer ' + token,
					})

					//	'Content-type': 'application/json',

					.send({
						name: 'Removable Hooded Faux Leather Moto Biker Jacket',
						price: 29.95,
						category: 'womens clothing',
					} as Products);
				expect(createP.status).toBe(200);
			});

			it('VALIDATION RETURN ERROE WITH  INVALID PRODUCT INPUTS', async () => {
				const createP = await request
					.post('/users/')
					.set({
						'Content-type': 'application/json',
						Authorization: 'Bearer ' + token,
					})
					.send({
						name: 'Removable Hooded Faux Leather Moto Biker Jacket',
						price: 29.95,
						category: '',
					});

				expect(createP.status).not.toBe(200);
			});
		});

		describe('==> INDEX ALL Product / ROUTE', () => {
			it('SHOULD RETURN STATUS (200) & LIST OF PRODUCTS', async () => {
				const listP = await request.get('/products/').set({
					Authorization: 'Bearer ' + token,
				});
				const products = listP.body.data;
				expect(listP.status).toBe(200);
			});
		});
		describe('==> SHOW ONE product BY ID / ROUTE', () => {
			it('SHOULD RETURN A TARGET product', async () => {
				const showP = await request.get(`/products/${newP.id}`).set({
					Authorization: 'Bearer ' + token,
				});
				const product = showP.body.data;
				expect(showP.status).toBe(200);
			});
		});
		describe('==> UPDATE product  / ROUTE', () => {
			it('should return res.status(200) and update a product', async () => {
				const updateP = await request
					.patch(`/products/${newP.id}`)
					.set('Authorization', 'Bearer ' + token)
					.send({
						name: 'r Moto Biker Jacket',
						price: 20,
						category: 'mens clothes',
					});

				expect(updateP.status).toBe(200);
			});
		});
		describe('==> DELETE product BY ID / ROUTE', () => {
			it('should return res.status(200) ', async () => {
				const deletP = await request
					.delete(`/products/${newP.id}`)
					.set('Authorization', 'Bearer ' + token);
				expect(deletP.status).toBe(200);
			});
		});
	
});
