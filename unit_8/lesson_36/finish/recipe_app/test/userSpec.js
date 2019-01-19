"use strict";

process.env.NODE_ENV = "test";

const User = require("../models/user"),
  { expect } = require("chai");
require("../main");

beforeEach(done => {
  User.remove({}).then(() => {
    done();
  });
});

describe("SAVE user", () => {
  it("it should save one user", done => {
    let testUser = new User({
      name: {
        first: "Jon",
        last: "Wexler"
      },
      email: "Jon@jonwexler.com",
      password: 12345,
      zipCode: 10016
    });

    testUser.save().then(() => {
      User.find({}).then(result => {
        expect(result.length).to.eq(1);
        expect(result[0]).to.have.property("_id");
        done();
      });
    });
  });
});
