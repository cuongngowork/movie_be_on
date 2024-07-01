process.env.NODE_ENV = 'test'
import * as chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js'

chai.use(chaiHttp);

const { assert, expect, should } = chai;

should();

describe('/Fist test collection', function () {
  it('test default api welcome route...', function (done) {

    chai.request(app).get('/api/welcome').end((err, res) => {
      res.should.have.status(200)
      res.body.should.be.a('object')
      console.log(res.body.message)
      done()
    })
  })

  it('should test two values...', function () {
    let expectedVal = 10;
    let actualVal = 10;

    expect(actualVal).to.be.equal(expectedVal);
  })
})