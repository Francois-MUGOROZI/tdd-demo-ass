const chai = require('chai');
const { expect } = require('chai');
const { describe, it } = require('mocha');
const chaiHttp = require('chai-http');
const { app } = require('../app');

chai.should();
chai.use(chaiHttp);

const contact = {
  name: 'My girl friend',
  description: 'the girl we met in canada',
  owner_email: 'girlfriend@gmail.com',
  phone_number: '+25454684',
};
let token;

before((done) => {
  chai
    .request(app)
    .post('/auth/signup')
    .send({
      email: 'test@gmail.com',
      firstname: 'francois',
      lastname: 'mugorozi',
      password: 'password',
    })
    .end((err, res) => {
      token = res.body.data.token;
      done();
    });
});

describe('Create contact record API route', () => {
  it('Should return 403 status code when user is not logged in', (done) => {
    chai
      .request(app)
      .post('/contacts')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Should return 201 status code when contact is created successfully', (done) => {
    chai
      .request(app)
      .post('/contacts')
      .set('authorization', token)
      .send(contact)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('Should return 409 status code when contact already exists', (done) => {
    chai
      .request(app)
      .post('/contacts')
      .set('authorization', token)
      .send(contact)
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });
});

describe('GET contacts record API route', () => {
  it('Should return 403 status code when user is not logged in', (done) => {
    chai
      .request(app)
      .get('/contacts')
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Should return 200 status code when contacts retrieved successfully', (done) => {
    chai
      .request(app)
      .get('/contacts')
      .set('authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Should return 404 status code when no cantact found with given id', (done) => {
    chai
      .request(app)
      .get('/contacts/0')
      .set('authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('Should return 200 status code when cantact found with given id', (done) => {
    chai
      .request(app)
      .get('/contacts/1')
      .set('authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('DELETE contact record API route', () => {
  it('Should return 403 status code when user is not logged in', (done) => {
    chai
      .request(app)
      .delete('/contacts/1')
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Should return 404 status code when no cantact found with given id', (done) => {
    chai
      .request(app)
      .delete('/contacts/0')
      .set('authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('Should return 200 status code when cantact deleted successfuly', (done) => {
    chai
      .request(app)
      .delete('/contacts/1')
      .set('authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
