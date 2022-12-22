const express = require("express");
const router = express.Router();

const {
  getAll,
  getOne,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/land");

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", createListing);
router.put("/:id", updateListing);
router.delete("/:id", deleteListing);

module.exports = router;
