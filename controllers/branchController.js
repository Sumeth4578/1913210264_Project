const Branch = require("../models/branch");
const Product = require("../models/products");
const config = require("../config/index");
const { validationResult } = require('express-validator')

exports.index = async (req, res, next) => {
  const branchs = await Branch.find().sort({ _id: -1 });

  res.status(200).json({
    data: branchs,
  });
};

exports.product = async (req, res, next) => {
  const product = await Product.find().populate("branch");

  res.status(200).json({
    data: product,
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
    const { name, location } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    let branch = new Branch({
      name: name,
      location: location,
    });

    await branch.save();

    res.status(200).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
    } = req.body;

    const branch = await Branch.findOneAndUpdate(
      { _id: id },
      {
        name: name,
      }
    );
    if (!branch) {
      const error = new Error("ไม่ได้อัพเดทข้อมูล");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        message: "อัพเดทแล้ว",
      });
    }
  } catch (error) {
    next(error)
  }
};

exports.show = async (req, res, next) => {
  try {
    const { id } = req.params;

    const branch = await Branch.findOne({
      _id: id,
    });
    if (!branch) {
      const error = new Error("ไม่พบข้อมูล");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        data: branch,
      });
    }
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
      const error = new Error("ไม่สามารถลบข้อมูลได้");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        message: "ลบข้อมูลแล้ว",
      });
    }
  } catch (error) {
    next(error)
  }
};
