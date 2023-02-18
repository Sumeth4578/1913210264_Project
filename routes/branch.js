var express = require("express");
var router = express.Router();
const branchController = require("../controllers/branchController");
const { body } = require("express-validator");

router.get("/", branchController.index);
router.get("/product", branchController.product);
router.get("/:id", branchController.branchProduct);

router.post("/", branchController.insert);
router.put("/:id",branchController.update)
router.delete("/:id", branchController.destroy);

router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("กรุณาป้อนข้อมูล"),
    body("location").not().isEmpty().withMessage("กรุณาป้อนข้อมูล"),
    body("location.lat")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนข้อมูล")
      .isNumeric()
      .withMessage("กรุณาป้อนข้อมูลเป็นตัวเลข"),
    body("location.lgn")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนข้อมูล")
      .isNumeric()
      .withMessage("กรุณาป้อนข้อมูลเป็นตัวเลข"),
  ],
  branchController.insert
);

module.exports = router;
