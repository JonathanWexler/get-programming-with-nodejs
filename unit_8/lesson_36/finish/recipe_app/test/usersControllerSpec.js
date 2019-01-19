"use strict";

const chai = require("chai"),
  { expect } = chai,
  usersController = require("../controllers/usersController"),
  chaiHTTP = require("chai-http"),
  app = require("../main");

chai.use(chaiHTTP);

describe("usersController", () => {
  describe("/users GET", () => {
    it("it should GET all the users", done => {
      chai
        .request(app)
        .get("/users")
        .end((errors, res) => {
          expect(res).to.have.status(200);
          expect(errors).to.be.equal(null);
          done();
        });
    });
  });

  describe("getUserParams", () => {
    it("should convert request body to contain the name attributes of the user object", () => {
      var body = {
        first: "Jon",
        last: "Wexler",
        email: "jon@jonwexler.com",
        password: 12345,
        zipCode: 10016
      };
      expect(usersController.getUserParams(body)).to.deep.include({
        name: {
          first: "Jon",
          last: "Wexler"
        }
      });
    });

    it("should return an empty object with empty request body input", () => {
      var emptyBody = {};
      expect(usersController.getUserParams(emptyBody)).to.deep.include({});
    });
  });
});
