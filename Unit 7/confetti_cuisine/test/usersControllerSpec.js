process.env.NODE_ENV = 'test';

const usersController = require('../controllers/usersController'),
User = require('../models/user'),
mongoose = require("mongoose"),
chai = require('chai'),
app = require('../main'),
expect = chai.expect,
chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

//
describe("usersController", () => {
  //   describe("getUserParams", () => {
  //     it("should convert request body to contain the name attributes of the user object", ()=>{
  //       var body = {first: "Jon", last: "Wexler", email: "jon@jonwexler.com", password: 12345, zipCode: 10016 };
  //       expect(usersController.getUserParams(body)).to.deep.include({name: {first: "Jon", last: "Wexler"}});
  //     });
  //
  //     it("should return an empty object with empty request body input", ()=>{
  //       var emptyBody = {};
  //       expect(usersController.getUserParams(emptyBody)).to.deep.include({});
  //     });
  //   });

  beforeEach(done => {
    User.remove({}).then(errors => {
      done();
    });
  });

  describe('/users GET', () => {
    it('it should GET all the users', (done) => {
      chai.request(app)
      .get('/users')
      .end((errors, res) => {
        expect(res).to.have.status(200);
        expect(res.body.users).to.be.a('array');
        expect(res.body.users.length).to.eql(0);
        done();
      });
    });
  });

});
