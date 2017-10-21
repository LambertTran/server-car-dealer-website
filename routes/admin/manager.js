'use strict';
/** =================================
                Packages
**==================================*/
const express = require('express');
const router  = express.Router();

var {upload} = require('../storages/upload-aws');
var {uploadCustomer} = require('../storages/upload-aws');
var verifyAuth = require ('../middleware/verify-auth');

var storeCarData = require('../middleware/store-car-data');
var storeCustomerImages = require('../middleware/store-customer-images');
var getCarsData = require('../middleware/get-cars-data');
var deleteCar = require('../middleware/delete-car-data');

/** Customer **/
var getCustomerImages = require('../middleware/get-customer-images');

/** =================================
                Body
**==================================*/

/** dashboard **/
router.get('/', verifyAuth ,(req,res) => {
  getCarsData().then((cars) => {
    res.render('dashboard',{cars:cars});
  })
})


/** customer iamges **/
router.get('/customeriamges',verifyAuth,(req,res) => {
  getCustomerImages().then(customers => {
    res.render('customerimages',{customers:customers});
  });
});

/** upload cars data **/
router.get('/upload',verifyAuth,(req,res) => {
  res.render('upload');
});

router.post('/upload', verifyAuth , upload.array('img'), (req, res) => {
  storeCarData(req)
    .then(() => {
      res.status(200).redirect('/admin')
    })
    .catch((err) => res.status(400).send('cant uploaded'));
});


/** upload customer images **/
router.get('/customers', verifyAuth, (req,res) => {
  res.render('customers')
});

router.post('/customers', verifyAuth , uploadCustomer.array('img'), (req, res) => {
  storeCustomerImages(req)
    .then(() => {
      res.status(200).redirect('/admin')
    })
    .catch((err) => res.status(400).send('cant uploaded'));
});


/** log out **/
router.post('/delete/:id',verifyAuth, (req,res) => {
  var id = req.params.id;
  deleteCar(id)
    .then(() => res.status(200).redirect('/admin'))
    .catch((err) => res.status(400).redirect('/admin'));
});


module.exports= router;