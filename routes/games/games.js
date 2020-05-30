const router = require("express").Router();
const gameAPIController = require("../../controllers/gameAPIController");

// Matches with "/api/games"
router.route("/")
  .post(gameAPIController.create);

// Matches with "/api/games/:id"
router
  .route("/:id")
  .get(gameAPIController.findById)
  .delete(gameAPIController.remove);

// Matches with "/api/games/hotitems"
router.route("/hotitems")
  .get(gameAPIController.hotitems);

module.exports = router;
