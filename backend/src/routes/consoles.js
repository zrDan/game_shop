const express = require("express");
const router = express.Router();
const { create, list } = require("../controllers/consolesController");

router.get("/consoles", list);
router.post("/create", create);

module.exports = router;
