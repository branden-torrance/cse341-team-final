const express = require("express");
const router = express.Router();

router.use("/apartments", require("./apartments"));
router.use("/houses", require("./houses"));
router.use("/commercial", require("./commercial"));
router.use("/land", require("./land"));
router.use("/api-docs", require("./swagger"));

module.exports = router;
