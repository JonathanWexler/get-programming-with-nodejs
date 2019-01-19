"use strict";

const assert = require("assert");

assert.equal(add(5, 4), 0, "5 plus 4 should equal 9");
let add = (x, y) => {
  return x + y;
};
