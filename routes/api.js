"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route("/api/convert").get(function (req, res, next) {
    const number = convertHandler.getNum(req.query.input);
    const unit = convertHandler.getUnit(req.query.input);

    if (!number && !unit) {
      res.status(200).send("invalid number and unit");
    } else if (!number) {
      res.status(200).send("invalid number");
    } else if (!unit) {
      res.status(200).send("invalid unit");
    } else {
      const convertedUnit = convertHandler.getReturnUnit(unit);
      const convertedNumber = convertHandler.convert(number, unit);
      const returnString = convertHandler.getString(
        number,
        unit,
        convertedNumber,
        convertedUnit
      );
      const returnObject = {
        initNum: number,
        initUnit: unit,
        returnNum: convertedNumber,
        returnUnit: convertedUnit,
        string: returnString,
      };
      res.status(200).send(returnObject);
    }
  });
};
