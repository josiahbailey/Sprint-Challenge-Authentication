const request = require('supertest')

const server = require('../api/server')

describe('server.js', function () {

  describe('/api/auth/register', function () {

    test('should return 201 with json body', function () {
      const newUser = {
        username: 'newGuy',
        password: 'sup'
      }
      return request(server)
        .post('/api/auth/register')
        .send(newUser)
        .expect(201)
        .then(res => {
          expect(res.type).toMatch(/json/i)
        })
    })

    test.todo('should return 500')
    test.todo('should return 401')
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
    test.todo('should return 200')
    test.todo('should return 500')
  })
})