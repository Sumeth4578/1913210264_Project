const Branch = require("../models/branch");
const Product = require("../models/products");
const config = require("../config/index");
const { validationResult } = require("express-validator");

exports.index = async (req, res, next) => {
  const branchs = await Branch.find(
    {},
    { createdAt: 0, updatedAt: 0, __v: 0 }
  ).sort({ name: 1 });

  res.status(200).json({
    data: branchs,
  });
};

exports.product = async (req, res, next) => {
  const products = await Product.find(
    {},
    { createdAt: 0, updatedAt: 0, __v: 0 }
  ).populate("branch");

  res.status(200).json({
    data: products,
  });
};

exports.branchProduct = async (req, res, next) => {
  const { id } = req.params;

  const branch = await Branch.findById({ _id: id }).populate("branchProduct");

  res.status(200).json({
    data: branch,
  });
};

exports.insert = async (req, res, next) => {
  try {
    const { name, district } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    let branch = new Branch({
      name: name,
      district: district,
    });

    await branch.save();

    res.status(200).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

exports.insertproduct = async (req, res, next) => {
  try {
    const { type, price, color, branch } = req.body;

    const tempBranch = Branch.findOne({ _id: branch });
    if (!tempBranch) {
      const error = new Error("ไม่พบข้อมูลของสาขา");
      error.statusCode = 400;
      throw error;
    }

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    let product = new Product({
      type: type,
      price: price,
      color: color,
      branch: branch,
    });
    await product.save();

    res.status(200).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const branch = await Branch.deleteOne({
      _id: id,
    });

    if (branch.deletedCount === 0) {
      const error = new Error("ไม่สามารถลบข้อมูลได้ / ไม่พบข้อมูลผู้ใช้งาน");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        message: "ลบข้อมูลเรียบร้อยแล้ว",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.destroyproduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.deleteOne({
      _id: id,
    });

    if (product.deletedCount === 0) {
      const error = new Error("ไม่สามารถลบข้อมูลได้ / ไม่พบข้อมูลผู้ใช้งาน");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        message: "ลบข้อมูลเรียบร้อยแล้ว",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, district } = req.body;

    const branch = await Branch.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        district: district,
      }
    );

    if (!branch) {
      const error = new Error("ไม่พบข้อมูลของสาขา");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      message: "แก้ไขข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

exports.updateproduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, price, branch, color } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: id },
      {
        tpye: type,
        price: price,
        branch: branch,
        color: color,
      }
    );

    if (!product) {
      const error = new Error("ไม่พบข้อมูลสินค้า");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      message: "แก้ไขข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};
