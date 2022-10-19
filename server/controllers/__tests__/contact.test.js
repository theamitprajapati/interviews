const request = require('supertest')
const app = require('../../app')
describe('Adding new Conact', () => {
  it('should create a new contact', async () => {
    const res = await request(app)
      .post('/contact/add')
      .send({
        fName: 'John',
        lName: 'Smith',
        phone:process.env.TO_MESSAGE_MOBILE_NUMBER
      })
     console.log(res.body) 
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ error: false, message: 'Contact add success!' })
  })
})

describe('Sending PHone', () => {
    it('SendOTP with message', async () => {
      const res = await request(app)
        .post('/message/send')
        .send({
          message: 'Hello message with jest',
          phone:process.env.TO_MESSAGE_MOBILE_NUMBER
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({ error: false, message: 'Message sent success!!!' })
    })
  })
