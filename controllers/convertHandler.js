function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    indexUnit = input.match(/[A-Za-z]/i);
    result = input.slice(0, indexUnit.index) || ["1"];
    if (result.includes("/")) {
      bits = result.split("/");
      if (bits.length > 2) {
        result = false;
      } else {
        result = bits[0] / bits[1];
      }
    }
    result = Number(result);
    if (isNaN(result)) {
      result = false;
    }
    return result;
  };

  this.getUnit = function (input) {
    let result;
    indexUnit = input.match(/[A-Za-z]/i);
    const rawUnit = input.slice(indexUnit.index).toLowerCase();
    switch (rawUnit) {
      case "l":
        result = "L";
        break;
      case "gal":
        result = "gal";
        break;
      case "mi":
        result = "mi";
        break;
      case "km":
        result = "km";
        break;
      case "lbs":
        result = "lbs";
        break;
      case "kg":
        result = "kg";
        break;
      default:
        result = false;
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case "L":
        result = "gal";
        break;
      case "gal":
        result = "L";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      default:
        result = "Not a valid input";
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit) {
      case "L":
        result = "liters";
        break;
      case "gal":
        result = "gallons";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      default:
        result = "Not a valid input";
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case "L":
        result = initNum / galToL;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = "Not a valid input";
    }
    return Number(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
