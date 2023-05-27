const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Whole number input", function (done) {
    let input = "32L";
    assert.equal(convertHandler.getNum(input), 32);
    done();
  });

  test("Decimal number input", function (done) {
    let input = "32.5L";
    assert.equal(convertHandler.getNum(input), 32.5);
    done();
  });

  test("Fractional number input", function (done) {
    let input = "1/2L";
    assert.equal(convertHandler.getNum(input), 0.5);
    done();
  });

  test("Fractional/Decimal number input", function (done) {
    let input = "0.5/2L";
    assert.equal(convertHandler.getNum(input), 0.25);
    done();
  });

  test("Double Fraction error", function (done) {
    let input = "1/2/3L";
    assert.equal(convertHandler.getNum(input), false);
    done();
  });

  test("No number provided", function (done) {
    let input = "mi";
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });

  test("Miles unit", function (done) {
    let input = "2mi";
    assert.equal(convertHandler.getUnit(input), "mi");
    done();
  });

  test("KM unit", function (done) {
    let input = "2km";
    assert.equal(convertHandler.getUnit(input), "km");
    done();
  });

  test("Gallon unit", function (done) {
    let input = "2gal";
    assert.equal(convertHandler.getUnit(input), "gal");
    done();
  });

  test("Litres unit", function (done) {
    let input = "2l";
    assert.equal(convertHandler.getUnit(input), "L");
    done();
  });

  test("Pounds unit", function (done) {
    let input = "2lbs";
    assert.equal(convertHandler.getUnit(input), "lbs");
    done();
  });

  test("KG unit", function (done) {
    let input = "2kg";
    assert.equal(convertHandler.getUnit(input), "kg");
    done();
  });

  test("Spelled out units", function (done) {
    let input = ["mi", "km", "lbs", "kg", "gal", "L"];
    let output = [
      "miles",
      "kilometers",
      "pounds",
      "kilograms",
      "gallons",
      "liters",
    ];
    input.forEach(function (ele, index) {
      assert.equal(convertHandler.spellOutUnit(ele), output[index]);
    });
    done();
  });

  test("Correct Gal to L conversion", function (done) {
    let input = [1, "gal"];
    let expected = 3.78541;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.1
    );
    done();
  });
  test("Correct L to gal conversion", function (done) {
    let input = [1, "L"];
    let expected = 0.26417;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.1
    );
    done();
  });
  test("Correct mi to km conversion", function (done) {
    let input = [1, "mi"];
    let expected = 1.60934;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.1
    );
    done();
  });
  test("Correct km to mi conversion", function (done) {
    let input = [1, "km"];
    let expected = 0.62137;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.1
    );
    done();
  });
  test("Correct pounds to kilogram conversion", function (done) {
    let input = [1, "lbs"];
    let expected = 0.45359;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.1
    );
    done();
  });
  test("Correct kilogram to pounds conversion", function (done) {
    let input = [1, "kg"];
    let expected = 2.20462;
    assert.approximately(
      convertHandler.convert(input[0], input[1]),
      expected,
      0.1
    );
    done();
  });
});
