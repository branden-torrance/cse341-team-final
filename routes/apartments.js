const express = require("express");
const router = express.Router();
const validation = require('../middleware/validate');

const {
  getAll,
  getOne,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/apartments");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", validation.validateListing, createListing);
router.put("/:id", validation.validateListing, updateListing);
router.delete("/:id", deleteListing);

module.exports = router;
