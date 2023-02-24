var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");
const passportJWT = require("../middleware/passportJWT");
const checkAdmin = require("../middleware/checkAdmin");

/* GET users listing. */
router.get("/", [passportJWT.isLogin], userController.index);

router.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อสกุล"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนอีเมล")
      .isEmail()
      .withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("กรุณากรอกรหัสผ่าน")
      .isLength({ min: 5 })
      .withMessage("รหัสผ่านต้องมี 5 ตัวอักษรขึ้นไป"),
  ],
  userController.register
);

router.post(
  "/login",
  [
    body("email")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนอีเมล")
      .isEmail()
      .withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("กรุณากรอกรหัสผ่าน")
      .isLength({ min: 5 })
      .withMessage("รหัสผ่านต้องมี 5 ตัวอักษรขึ้นไป"),
  ],
  userController.login
);

module.exports = router;
