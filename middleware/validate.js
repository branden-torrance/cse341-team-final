const validator = require("../helpers/validate");

const validateListing = (req, res, next) => {
  const validationRule = {
    price: "required|string",
    listDate: "required|date",
    address: "string",
    residenceType: "string",
    yearBuilt: "required|string",
    sqFeet: "required|integer",
    pricePerSqFeet: "integer",
    availability: "required|boolean",
    propertyDescription: "string",
    lengthTimeListed: "integer",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  validateListing,
};
