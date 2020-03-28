const request = require('supertest')

const server = require('../api/server')

describe('server.js', function () {

  describe('/api/auth/register', function () {

    // test('should return 201 with json body', function () {
    //   const newUser = {
    //     username: 'newGuy',
    //     password: 'sup'
    //   }
    //   return request(server)
    //     .post('/api/auth/register')
    //     .send(newUser)
    //     .expect(201)
    //     .then(res => {
    //       expect(res.type).toMatch(/json/i)
    //     })
    // })

    test('should return 500', function () {
      const userThatAlreadyExists = {
        username: 'test',
        password: 'test'
      }
      return request(server)
        .post(`/api/auth/register`)
        .send(userThatAlreadyExists)
        .expect(500)
    })
    test('should return 401', function () {
      const noUsername = {
        password: 'aasodijaso'
      }
      return request(server)
        .post(`/api/auth/register`)
        .send(noUsername)
        .expect(401)
    })
  })

  describe('/api/auth/login', function () {

    test('should return 200 with json body', function () {
      const login = {
        username: 'test',
        password: 'test'
      }
      return request(server)
        .post('/api/auth/login')
        .send(login)
        .expect(200)
        .then(res => {
          expect(res.type).toMatch(/json/i)
        })
    })

    test('should return 401 unauthorized', function () {
      const fakeLogin = {
        username: 'doesntexist',
        password: 'blahblah'
      }
      return request(server)
        .post('/api/auth/login')
        .send(fakeLogin)
        .expect(401)
    })

    test('should return 500 error', function () {
      return request(server)
        .post('/api/auth/login')
        .expect(500)
    })
  })

  describe('/api/jokes', function () {
    test('should return 200', function () {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1ODUzMjQ4OTgsImV4cCI6MTU4NTQxMTI5OH0.21d0IMXVBMrS-rgN-diav70i1AUBbt00LVY1so7uU3g'
      return request(server)
        .get('/api/jokes')
        .set({ authorization: token })
        .expect(200)
    })

    test('should return 400', function () {
      return request(server)
        .get('/api/jokes')
        .expect(400)
    })
  })
})