var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Customers = require('../models').customers;
const Employees = require('../models').employees;
const Offices = require('../models').offices;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/customers', function (req, res, next) {
  Customers.findAll().then(customers => {
    res.json(customers);
  });
});
router.get('/employees', function (req, res, next) {
  Employees.findAll().then(employees => {
    res.json(employees);
  });
});
router.get('/offices', function (req, res, next) {
  Offices.findAll().then(offices => {
    res.json(offices);
  });
});

module.exports = router;
