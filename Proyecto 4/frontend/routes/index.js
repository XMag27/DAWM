var express = require('express');
const axios = require('axios');
const { json } = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/customers', async function (req, res, next) {
  const url = 'http://localhost:3000/customers';
  const config = {
    proxy: {
      host: "localhost",
      port: 3000,
    },
  };
  const response = await axios.get(url, config);
  res.render('customers', { arrCustomers: response.data });
});

router.get('/orders/:customerNumber', async function (req, res, next) {
  const url = 'https://apinosql-default-rtdb.firebaseio.com/collection.json?orderBy=%22status%22&equalTo=%22Shipped%22';
  const urlallOrders = 'https://apinosql-default-rtdb.firebaseio.com/collection.json';
  const response = await axios.get(url);
  const responseallOrders = await axios.get(urlallOrders);
  const allOrders = Object.values(responseallOrders.data).filter((order) => order.customerNumber === parseInt(req.params.customerNumber));
  const shippedOrders = Object.values(response.data).filter((order) => order.customerNumber === parseInt(req.params.customerNumber)
  );
  res.render('pedidos', { arrOrders: shippedOrders, allOrders: allOrders });
});




module.exports = router;
