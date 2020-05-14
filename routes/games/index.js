const router = require("express").Router();
const gameRoutes = require("./games");

// game routes
router.use("/games", gameRoutes);

module.exports = router;
