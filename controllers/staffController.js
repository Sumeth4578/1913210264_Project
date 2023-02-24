const Staff = require("../models/staff");
const config = require("../config/index");
const { validationResult } = require("express-validator");

exports.index = async (req, res, next) => {
  const staff = await Staff.find().sort({ _id: 1 });

  res.status(200).json({
    data: staff,
  });
};

exports.show = async (req, res, next) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findOne({
      _id: id,
    });

    if (!staff) {
      const error = new Error("ไม่พบผู้ใช้งาน");
      error.statusCode = 400;
      throw error;
    } else {
      res.status(200).json({
        data: staff,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.insert = async (req, res, next) => {
  try {
    const { name, gender, email, position, salary } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    let staff = new Staff({
      name: name,
      gender: gender,
      email: email,
      position: position,
      salary: salary,
    });
    await staff.save();

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

    const staff = await Staff.deleteOne({
      _id: id,
    });

    if (staff.deletedCount === 0) {
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
    const { name, gender, email, position, salary } = req.body;

    const staff = await Staff.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        gender: gender,
        email: email,
        position: position,
        salary: salary,
      }
    );

    if (!staff) {
      const error = new Error("ไม่พบพนักงาน");
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
