const express = require('express');
const router = express.Router();
const Office = require('../models/office');

router.post("", (req, res, next) => {
  console.log(req.body);
  const office = new Office(req.body);
  console.log("Office: "+ office);
  office.save().then(createdOffice => {
    res.status(201).json({
      message: 'Office added successfully',
      officeId: createdOffice._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const office = new Office({
    _id: req.body._id,
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    maxCapacity: req.body.maxCapacity,
    color: req.body.color
  });
  //const office = new Office(req.body);
  Office.updateOne({_id: req.params.id}, office).then(result => {
    res.status(200).json({message: "Update Successful! "+ office.id});
  });
});

router.get("", (req, res, next) => {
  Office.find().then(documents => {
    res.status(200).json({
      message: 'Offices fetched successfully',
      offices: documents
    });
    console.log(documents);
  });
})

router.get("/:id", (req, res, next) => {
  Office.findById(req.params.id).then(singleOffice => {
    if (singleOffice)
    res.status(200).json(singleOffice)
    else {
      res.status(404).json({message: 'Office not found'});
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Office.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Office deleted"});
  })
});

module.exports = router;
