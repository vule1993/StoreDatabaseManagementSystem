const { Router } = require('express');
const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const controller = require('../controllers/controller');


//render homepage
router.get('/', controller.renderHome);

//function create, find, update, delete for customers
router.get('/customer', controller.viewCustomer);
router.post('/customer', controller.findCustomer);
router.get('/addCustomer', controller.formCustomer);
router.post('/addCustomer', controller.addCustomer);


router.get('/editCustomer/:CUSTOMER_ID', controller.editCustomer);
router.post('/editCustomer/:CUSTOMER_ID', controller.updateCustomer);



//Function create, find, update, delete for products
router.get('/product', controller.productView);
router.get('/addProduct', controller.formProduct);
router.post('/addProduct', controller.addProduct);

router.get('/editProduct/:PRODUCT_ID', controller.editProduct);
router.post('/editProduct/:PRODUCT_ID', controller.updateProduct);


//render SaleReportDaily
router.get('/saleReportDaily', controller.saleReportDaily);
router.get('/saleReportWeekly', controller.saleReportWeekly);


// router.get('/:PRODUCT_ID', controller.deleteProduct);
router.get('/:CUSTOMER_ID', controller.deleteCustomer);



module.exports = router;