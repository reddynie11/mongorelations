var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


//models
const {Product} = require('../model/product');
const {Brand} = require('../model/brand');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/product', (req,res)=>{
  const newProduct = new Product(req.body).save()
  res.send('saved')
})

router.get('/product', (req,res)=>{
  Product.find()
        .populate('brand','_id')
        .exec((err,data)=>{
    if (err) res.send(err)
    res.send(data)
  })
  });

router.get('/product/article_by_id', (req,res)=>{
  let queryType = req.query.type;
  if(queryType === 'array'){
    let ids = req.query.id.split(',');
    items =[];
    items = ids.map((item)=>{
      return mongoose.Types.ObjectId(item)
    })
    Product.find({'_id':{$in:items}})
           .populate('brand','-_id')
           .exec((err,data)=>{
             if (err) throw err
             res.send(data)
           })
  }
});

router.get('/product/sort',(req,res)=>{
  let sortOrder = req.query.order?req.query.order:'asc'
  let sortBy = req.query.sortBy?req.query.sortBy:'_id'
  let limit = req.query.limit? parseInt(req.query.limit):100

  Product.find()
         .populate('brand','-_id')
         .sort([[sortBy,sortOrder]])
         .limit(limit)
         .exec((err,data)=>{
            if (err) throw err
            res.send(data)
         })
})

module.exports = router;
