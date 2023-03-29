const { authJwt } = require("../middleware/authJWT.js");
const controller = require("../controllers/userController.js");
const express = require("express");

const router = express.Router();

module.exports = (router)=> {
  router.use((req, res, next)=> {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/api/test/all", controller.allAccess);

  router.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);


  router.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};

module.exports= router;