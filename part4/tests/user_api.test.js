const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const { testUser, usersInDB } = require('./test_helper')


beforeEach(async () => {
    await User.deleteMany({})
})

describe('User tests', () => {
    describe('adding users', () => {
        test('should create new user correctly', async () => {
            await api.post('/api/users')
                .send(testUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            expect((await usersInDB()).length).toBe(1)
        })

        test('database should contain created user', async () => {
            await api.post('/api/users')
                .send(testUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            const user = (await usersInDB())[0]
            expect(user.username).toBe(testUser.username)
            expect(user.name).toBe(testUser.name)
        })

        test("shouldn't create new user with too short 'username'", async () => {
            const modified = { ...testUser, username: 'p' }
            await api.post('/api/users')
                .send(modified)
                .expect(400)

            expect((await usersInDB()).length).toBe(0)
        })
        
        test("shouldn't create new user with too short 'password'", async () => {
            const modified = { ...testUser, password: '1f' }
            await api.post('/api/users')
                .send(modified)
                .expect(400)

            expect((await usersInDB()).length).toBe(0)
        })

        test("shouldn't create new user when username already exists", async () => {
            await api.post('/api/users')
                .send(testUser)
                .expect(201)

            const modified = { ...testUser, password: '13rmadfmo11' }
            await api.post('/api/users')
                .send(modified)
                .expect(400)

            expect((await usersInDB()).length).toBe(1)
        })

        test("shouldn't create new user when 'username' left undefined", async () => {
            const modified = { name: testUser.name, password: testUser.password }
            await api.post('/api/users')
                .send(modified)
                .expect(400)

            expect((await usersInDB()).length).toBe(0)
        })

        test("shouldn't create new user when 'password' left undefined", async () => {
            const modified = { username: testUser.username, name: testUser.name }
            await api.post('/api/users')
                .send(modified)
                .expect(400)
                
            expect((await usersInDB()).length).toBe(0)
        })
    })
})

afterAll(() => mongoose.connection.close())