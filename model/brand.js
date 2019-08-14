const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name : {type : String, required : true, unique:true},
    description : { type : String},
},{timestamps:true});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = {Brand}