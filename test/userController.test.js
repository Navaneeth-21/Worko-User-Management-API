const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('../src/app');
const User = require('../src/models/user');

dotenv.config();

describe('User API', () => {
    let server;

    beforeAll(async () => {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        server = app.listen(process.env.PORT || 3000);
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await server.close();
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    describe('POST /worko/user', () => {
        it('should create a new user', async () => {
            const res = await request(app)
                .post('/worko/user')
                .send({
                    email: 'test@example.com',
                    name: 'Test User',
                    age: 30,
                    city: 'Test City',
                    zipCode: '12345'
                })
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('email', 'test@example.com');
        });

        it('should return 400 for invalid data', async () => {
            const res = await request(app)
                .post('/worko/user')
                .send({
                    email: 'invalid-email',
                    name: 'Test User',
                    age: 'invalid-age',
                    city: 'Test City',
                    zipCode: '12345'
                })
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
            expect(res.statusCode).toEqual(400);
        });
    });

    describe('GET /worko/user', () => {
        it('should list all users', async () => {
            await User.create({
                email: 'test@example.com',
                name: 'Test User',
                age: 30,
                city: 'Test City',
                zipCode: '12345'
            });

            const res = await request(app)
                .get('/worko/user')
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
    });

    describe('GET /worko/user/:userId', () => {
        it('should get user details', async () => {
            const user = await User.create({
                email: 'test@example.com',
                name: 'Test User',
                age: 30,
                city: 'Test City',
                zipCode: '12345'
            });

            const res = await request(app)
                .get(`/worko/user/${user._id}`)
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('email', 'test@example.com');
        });

        it('should return 404 for non-existing user', async () => {
            const nonExistingId = mongoose.Types.ObjectId();
            const res = await request(app)
                .get(`/worko/user/${nonExistingId}`)
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
            expect(res.statusCode).toEqual(404);
        });
    });

    describe('PUT /worko/user/:userId', () => {
        it('should update user details', async () => {
            const user = await User.create({
                email: 'test@example.com',
                name: 'Test User',
                age: 30,
                city: 'Test City',
                zipCode: '12345'
            });

            const res = await request(app)
                .put(`/worko/user/${user._id}`)
                .send({
                    email: 'updated@example.com',
                    name: 'Updated User',
                    age: 31,
                    city: 'Updated City',
                    zipCode: '54321'
                })
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('email', 'updated@example.com');
        });

        it('should return 400 for invalid data', async () => {
            const user = await User.create({
                email: 'test@example.com',
                name: 'Test User',
                age: 30,
                city: 'Test City',
                zipCode: '12345'
            });

            const res = await request(app)
                .put(`/worko/user/${user._id}`)
                .send({
                    email: 'invalid-email',
                    age: 'invalid-age'
                })
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
            expect(res.statusCode).toEqual(400);
        });
    });

    describe('DELETE /worko/user/:userId', () => {
        it('should soft delete a user', async () => {
            const user = await User.create({
                email: 'delete@example.com',
                name: 'Delete User',
                age: 25,
                city: 'Delete City',
                zipCode: '54321'
            });

            const deleteRes = await request(app)
                .delete(`/worko/user/${user._id}`)
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
            expect(deleteRes.statusCode).toEqual(204);

            const checkRes = await request(app)
                .get(`/worko/user/${user._id}`)
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
            expect(checkRes.statusCode).toEqual(404);
        });

        it('should return 404 for non-existing user', async () => {
            const nonExistingId = mongoose.Types.ObjectId();
            const res = await request(app)
                .delete(`/worko/user/${nonExistingId}`)
                .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`);
            expect(res.statusCode).toEqual(404);
        });
    });
});
