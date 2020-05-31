const router = require("express").Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require("../config/middleware/upload");

let routes = (app) => {
  router.get("/", homeController.getHome);

  router.post("/upload", upload.single("file"), uploadController.uploadFiles);

  return app.use("/", router);
};

module.exports = routes;