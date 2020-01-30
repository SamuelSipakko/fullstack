const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.biggerList
        .map(blog => new Blog(blog))
    const promises = blogObjects.map(blog => blog.save())
    await Promise.all(promises)
})

describe('Blog tests', () => {
    describe('fetching data', () => {
        test('all blogs are returned', async () => {
            const response = await api.get('/api/blogs')
            expect(response.body.length).toBe(helper.biggerList.length)
        })

        test('blogs are identified with "id" instead of "_id"', async () => {
            const response = await api.get('/api/blogs')
            expect(response.body[0].id).toBeDefined()
        })

        test('returned blog contain a specific blog', async () => {
            const response = await api.get('/api/blogs')
            const ids = response.body.map(r => r.id)
            expect(ids).toContain(helper.biggerList[2]._id)
        })
    })

    describe('adding data', () => {
        test('adds a new blog correctly into the database', async () => {
            await api.post('/api/blogs')
                .send(helper.testBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsFinal = await helper.blogsInDB()
            expect(blogsFinal.length).toBe(helper.biggerList.length + 1)
        })

        test('added blog should be the same', async () => {

            await api.post('/api/blogs')
                .send(helper.testBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')
            const modified = response.body.map(r => ({ t: r.title, a: r.author }))
            expect(modified).toContainEqual({ t: helper.testBlog.title, a: helper.testBlog.author })
        })

        test('sets likes to 0 by default if left unspecified', async () => {
            await api.post('/api/blogs')
                .send(helper.testBlogNoLikes)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')
            const modified = response.body.map(r => ({ t: r.title, a: r.author, l: r.likes }))
            const reference = { t: helper.testBlogNoLikes.title, 
                                a: helper.testBlogNoLikes.author, 
                                l: 0 }
            expect(modified).toContainEqual(reference)
        })

        test('returns "400 Bad request" if "title" left unspecified', async () => {
            await api.post('/api/blogs')
                .send(helper.testBlogNoTitle)
                .expect(400)

            const response = await api.get('/api/blogs')
            const modified = response.body.map(r => {
                return { a: r.author, u: r.url, l: r.likes }
            })
            const reference = { a: helper.testBlogNoTitle.author,
                                u: helper.testBlogNoTitle.url,
                                l: helper.testBlogNoTitle.likes }
            expect(modified).not.toContainEqual(reference)
        })

        test('returns "400 Bad request" if "url" left unspecified', async () => {
            await api.post('/api/blogs')
                .send(helper.testBlogNoUrl)
                .expect(400)

            const response = await api.get('/api/blogs')
            const modified = response.body.map(r => {
                return { t: r.title, a: r.author, l: r.likes }
            })
            const reference = { t: helper.testBlogNoUrl.title,
                                a: helper.testBlogNoUrl.author,
                                l: helper.testBlogNoUrl.likes }
            expect(modified).not.toContainEqual(reference)
        })
    })

    describe('deleting data', () => {
        test('deletes a post from database correctly', async () => {
            const blogs = (await api.get('/api/blogs')).body
            expect(blogs.length).toBeGreaterThan(0)

            await api.delete(`/api/blogs/${blogs[0].id}`)
                     .expect(204)

            const response = await api.get('/api/blogs')
            const modified = response.body.map(r => r.id)
            expect(modified).not.toContain(blogs[0].id)
        })
    })

    describe('updating data', () => {
        test('updates a post from database correctly', async () => {
            const blogs = (await api.get('/api/blogs')).body
            expect(blogs.length).toBeGreaterThan(0)

            const updated = { ...blogs[0], title: 'Title changed' }
            await api.put(`/api/blogs/${blogs[0].id}`)
                     .send(updated)
                     .expect(204)

            const response = await api.get('/api/blogs')
            const changed = response.body.find(b => b.id === blogs[0].id)
            expect(changed).toBeDefined()
            expect(changed.title).toBe('Title changed')
        })
    })
})



afterAll(() => mongoose.connection.close())