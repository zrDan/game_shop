const express = require("express");
const router = express.Router();
const {
  create,
  list,
  videogameById,
  cover,
  listCategory,
  categoryName,
  videogameDetails,
} = require("../controllers/videogamesController");
const Videogames = require("../models/Videogames");

router.get("/videogames", list);
router.post("/create", create);
router.get("/cover/:videogameId", cover);
router.get("/videogameDetails/:videogameId", videogameDetails);
router.get("/category/:categoryName", listCategory);

router.param("videogameId", videogameById);
router.param("categoryName", categoryName);

module.exports = router;
