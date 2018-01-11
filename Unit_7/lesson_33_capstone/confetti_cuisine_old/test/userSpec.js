process.env.NODE_ENV = 'test';
const User = require('../models/user');
const mongoose = require("mongoose");
const chai = require('chai');
const expect = chai.expect;

beforeEach((done) => {
  User.remove({}).then(errors => {
    done();
  });
});

describe('SAVE user', () => {
  it('it should save one user', (done) => {
    let testUser = new User({name: {first: 'Jon', last: 'Wexler'}, email: "Jon@jonwexler.com", password: 12345, zipCode: 10016}),
    savePromise = testUser.save(),
    findPromise = User.find({});
    Promise.all([savePromise, findPromise]).then(result => {
      expect(result[1].length).to.eq(1);
      expect(result[1][0]).to.have.property('_id');
      done();
    });
  });
});


// .then(User.find({})
//   .then(result => {
//     console.log(result)
//     expect(result.length).to.eq(1);
//     expect(result[0]).to.have.property('_id');
//     done();
//   })
// );
