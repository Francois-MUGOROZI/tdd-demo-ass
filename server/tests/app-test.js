const chai = require('chai');
const { expect } = require('chai');
const { describe, it } = require('mocha');
const chaiHttp = require('chai-http');
const { app } = require('../app');

chai.should();
chai.use(chaiHttp);

describe('Route test', () => {
  it('Should return 404 not found route', (done) => {
    chai
      .request(app)
      .get('/api/notfound')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('Should return 200 on / request route', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
