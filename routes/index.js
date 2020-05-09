const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../")); //UPDATE LATER
});

module.exports = router;