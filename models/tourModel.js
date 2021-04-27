const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'A tour must have a name'], unique: true},
    rating: {type: Number, default: 4.5},
    duration: {
type: Number,
required: [true, 'A tour must have a duration']
    },
maxGroupSize: {
  type: Number,
  required: [true, 'A tour must have a group of ']
},
difficulty: {
  type: Number,
  required: [true, 'A tour must have a group of ']
},
ratingAverage: {
  type: Number,
  default: 4.5
},
ratingQuantity: {
  type: Number,
  default: 0
},

priceDiscount: Number,
summary: {
  type: String,
  trim: true,
  required: [true, 'A tour must have a description']
},
description: {
  type: String,
  trim: true,
},
imageCover: {
  type: String,
  required: [true, 'A tour must have a cover image']
},
images: [String],
createdAt: {
  type: Date,
  default: Date.now()
},
startDates: [Date],
    price: {type: Number, required: [true, 'A tour must have a price']}
  })
  
const Tour = mongoose.model('Tour', tourSchema);
  
module.exports = Tour;  
