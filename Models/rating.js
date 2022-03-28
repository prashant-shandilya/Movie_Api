const mongoose = require('mongoose');


const r_schema = new mongoose.Schema({
    id:Number,
    rating:[Number]
})

module.exports = mongoose.model('rating',r_schema);
