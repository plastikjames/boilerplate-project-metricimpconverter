const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  //Convert a valid input such as 10L: GET request to /api/convert.
  test('Send {input: "10L"}', function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "10L" })
      .end(function (err, res) {
        //The status should be 200
        assert.equal(res.status, 200);
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, "gal");
        done();
      });
  });

  test("Send invalid input", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "32g" })
      .end(function (err, res) {
        //The status should be 200
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid unit");
        done();
      });
  });
  test("Send invalid number", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4kg" })
      .end(function (err, res) {
        //The status should be 200
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number");
        done();
      });
  });
  test("Send invalid number & unit", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4kilogram" })
      .end(function (err, res) {
        //The status should be 200
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });

  test("Send no number", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "kg" })
      .end(function (err, res) {
        //The status should be 200
        assert.equal(res.status, 200);
        assert.equal(res.body.returnNum, 2.20462);
        assert.equal(res.body.returnUnit, "lbs");
        done();
      });
  });
});
