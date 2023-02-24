var express = require("express");
var router = express.Router();
const staffController = require("../controllers/staffController");
const { body } = require("express-validator");
const passportJWT = require("../middleware/passportJWT");
const checkAdmin = require("../middleware/checkAdmin");

router.get(
  "/",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  staffController.index
);

router.get(
  "/:id",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  staffController.show
);

router.post(
  "/",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  [
    body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อสกุล"),
    body("gender").not().isEmpty().withMessage("กรุณาป้อนเพศ"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนอีเมล")
      .isEmail()
      .withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body("salary")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนรายได้")
      .isNumeric()
      .withMessage("กรุณาป้อนรายได้เป็นตัวเลข"),
  ],
  staffController.insert
);

router.delete(
  "/:id",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  staffController.destroy
);

router.put(
  "/:id",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  staffController.update
);

module.exports = router;
