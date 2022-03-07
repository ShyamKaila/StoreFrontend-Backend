import supertest from 'supertest';
import Clinte from '../../database';
import app from '../../server';
import {UserStores , Users} from '../../models/user';


const userStore = new UserStores();
const request = supertest(app);
let token = '';

describe('User API Endpoints', () => {
	const newUser = {
		username: 'userTesting',
		firstname: 'Ahmed',
		lastname: 'Sabry',
		password: 'test123',
	}  as Users ;

	describe('Test Authenticate methods', () => {

		it('FAILD TO AUTHENTICATE WITH RWONG EMAIL', async () => {
			const auth = await request
				.post('/api/users/login')
				.set('Content-type', 'application/json')
				.send({
					email: 'invalid@email.com',
					password: 'test123',
				});
			expect(auth.status).not.toBe(200);
		});
	 });

		describe('==> REGISTER / ROUTE', () => {
			it(' WITHOUT ADMIN OR VALID TOKen RETURN ERROR ', async () => {
				const register = await request
					.post('/users/signup')
					.set({
						'Content-type': 'application/json',
						Authorization: 'Bearer ' + token,
					})
					.send({
						username: 'userTesting22',
						firstname: 'Ahmed22',
						lastname: 'Sabry22',
						password: 'test12322',
					});

				expect(register.status).not.toBe(200);
			});

			it('VALIDATION RETURN ERROE WITH  INVALID INPUTS', async () => {
				const register = await request
					.post('/users/signup')
					.set({
						'Content-type': 'application/json',
						Authorization: 'Bearer ' + token,
					})
					.send({
						username: '',
						firstname: 'Ahmed22',
						lastname: 'Sabry22',
						password: 'test12322',
					});

				expect(register.status).not.toBe(200);
			});
			it(' WITH EXIST EMAIL IN DB SHOULD RETURN ERORR', async () => {
				const register = await request
					.post('/users/signup')
					.set({
						'Content-type': 'application/json',
						Authorization: 'Bearer ' + token,
					})
					.send({
						username: 'userTesting22',
						firstname: 'Ahmed22',
						lastname: 'Sabry22',
						password: 'test12322',
					});

				expect(register.status).not.toBe(200);
			});
		});

	
	});

