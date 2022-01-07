const express = require('express');
const router = express.Router();
const Staff = require('../models/staff');
const Office = require('../models/office');

router.post("", (req, res, next) => {
  console.log(req.body);
  Office.findById(req.body.officeId).then(singleOffice => {
    const staff = new Staff({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatarSrc: req.body.avatarSrc,
      office: singleOffice
    });
    staff.save().then(createdStaff => {
      res.status(201).json({
        message: 'staff added to office',
        staffId: createdStaff
      });
    });
  });
});

router.put("/:id", (req, res, next) => {
    const staff = new Staff({
      _id: req.body._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatarSrc: req.body.avatarSrc,
      office: req.body.office,
    });
    Staff.updateOne({_id: req.params.id}, staff).then(result => {
      res.status(200).json({message: "Update Successful! "+ staff._id});
    });
  });

router.get("", (req, res, next) => {
  Staff.find().then(documents => {
    res.status(200).json({
      message: 'Staffs fetched successfully',
      staff: documents
    });
    console.log(documents);
  });
});

router.get("/:id", (req, res, next) => {
  Staff.findById(req.params.id).then(singleStaff => {
    if (singleStaff)
    res.status(200).json(singleStaff);
    else{
      res.status(404).json({message: "Staff not found"});
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Staff.findOneAndDelete({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Staff Deleted"});
  });
});

module.exports = router;
