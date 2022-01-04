const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const officeRoutes = require('./routes/offices');
const office = require('./models/office');

const staffRoutes = require('./routes/staffs');
const staff = require('./models/staff');
const app = express();

mongoose.connect("mongodb+srv://solafidei:enXUKq7EX3BmzGc@cluster0.95jeb.mongodb.net/office-space-management?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database')
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});
app.use("/api/offices", officeRoutes);
app.use("/api/staffs", staffRoutes);
module.exports = app;
