const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name : { type : String, required : true, unique:true},
    description : { type: String},
    price : {type : Number},
    brand:{
        type : Schema.Types.ObjectId,
        ref : "Brand"
    }
},{timestamps:true});

const Product = mongoose.model('Product', productSchema);

module.exports = {Product};