var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const { route } = require('../../frontend/routes');
const Customers = require('../models').customers;
const Employees = require('../models').employees;
const Offices = require('../models').offices;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/customers', function (req, res, next) {
  Customers.findAll()
    .then((customers) => {
      res.json(customers);
    })
});
router.get('/customers/:customerName', function (req, res, next) {
  Customers.findAll({
    where: {
      customerName: req.params.customerName
    }
  })
    .then((customers) => {
      res.json(customers[0].customerNumber);
    }
    )
});


router.get("/customers/findAll", function (req, res, next) {
  Customers.findAll({
    attributes: {
      exclude: [
        "CustomerFirstName",
        "CustomerLastName",
        "salesRepEmployeeNumber",
        "phone",
        "addressLine1",
        "addressLine2",
        "postalCode",
      ],
    },
  })
    .then((customers) => {
      res.json(customers);
    })
    .catch((error) => res.status(400).send(error));
});

//A post that recieves a json with an array of numbers and returns the sum of them
router.post('/orders', function (req, res, next) {
  let orders = req.body;
  let total = 0;
  for (let i = 0; i < orders.length; i++) {
    total += orders[i];
  }
  res.json({ total: total });
});

module.exports = router;
