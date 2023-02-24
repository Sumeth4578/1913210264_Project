var express = require("express");
var router = express.Router();
const branchController = require("../controllers/branchController");
const { body } = require("express-validator");
const passportJWT = require("../middleware/passportJWT");
const checkAdmin = require("../middleware/checkAdmin");

//router.get('/', [passportJWT.isLogin], [checkAdmin.isAdmin], companyController.index);

router.get("/", branchController.index);

router.get("/product", branchController.product);

router.get("/:id", branchController.branchProduct);

router.post(
  "/",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  [body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อสาขา")],
  branchController.insert
);

router.post(
  "/product",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  [
    body("type").not().isEmpty().withMessage("กรุณาป้อนชื่อสาขา"),
    body("price").not().isEmpty().withMessage("กรุณาป้อนราคา"),
    body("branch").not().isEmpty().withMessage("กรุณาป้อนสินค้า"),
  ],
  branchController.insertproduct
);

router.delete(
  "/:id",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  branchController.destroy
);

router.put(
  "/:id",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  branchController.update
);

router.delete(
  "/product/:id",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  branchController.destroyproduct
);

router.put(
  "/product/:id",
  [passportJWT.isLogin],
  [checkAdmin.isAdmin],
  branchController.updateproduct
);

module.exports = router;
