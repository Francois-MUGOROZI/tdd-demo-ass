const chai = require('chai');
const { expect } = require('chai');
const { describe, it } = require('mocha');
const chaiHttp = require('chai-http');
const { app } = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Signup and Signin API Route', () => {
  it('Should return 201 when user signed up successfully', (done) => {
    chai
      .request(app)
      .post('/auth/signup')
      .send({
        email: 'mugorozi@gmail.com',
        firstname: 'francois',
        lastname: 'mugorozi',
        password: 'password',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('Should return 409 when user already exist', (done) => {
    chai
      .request(app)
      .post('/auth/signup')
      .send({
        email: 'mugorozi@gmail.com',
        firstname: 'francois',
        lastname: 'mugorozi',
        password: 'password',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });

  it('Should return 200 when user signed in successfully', (done) => {
    chai
      .request(app)
      .post('/auth/signin')
      .send({
        email: 'mugorozi@gmail.com',
        password: 'password',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Should return 404 when user not found', (done) => {
    chai
      .request(app)
      .post('/auth/signin')
      .send({
        email: 'mugorozis@gmail.com',
        password: 'password',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('Should return 400 when password is incorrect', (done) => {
    chai
      .request(app)
      .post('/auth/signin')
      .send({
        email: 'mugorozi@gmail.com',
        password: 'passwordawead',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
