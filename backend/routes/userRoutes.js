const router = require("express").Router();
const userController = require("../controllers/userController");
var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

router.post("/register",upload.single('image'), userController.saveUser);
// router.route("/register")
  // .post(userController.saveUser);

router.route("/login").post(userController.loginUser);
router.route("/list").get(userController.list);

module.exports = router;
