const fs = require('fs');
const APIFeatures = require('../utils/apiFeatures');
const Tour = require('./../models/tourModel');

// exports.checkId = (req, res, next, val)=>{
//   const id = val * 1;
//   if (tours.length < id)
//     return res.status(404).json({
//       status: 'failed',
//       tour: 'Invalid id',
//     });

// next()
// }

// exports.checkBody = (req, res, next) => {
//   const { name, price } = req.body;
//   if (name || price === undefined)
//     return res.status(400).json({
//       status: 'error',
//       tour: 'Name and price should be there',
//     });

//   next();
// };

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // // FILTERING
    // const queryObj = { ...req.query };
    // const excludedFields = ['page', 'sort', 'fields', 'limit'];
    // // const tours = await Tour.find();
    // excludedFields.forEach((el) => delete queryObj[el]);

    // // const tours = await Tour.find(req.query)

    // // ADVANCED FILTERING
    // let queryStr = JSON.stringify(queryObj);
    // //  console.log(queryStr.replace(/\(gte|gt|lte|lt)\b/g, match => `$${match}`))
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // // BUILD QUERY
    // let query = Tour.find(JSON.parse(queryStr));

    // // SORTING
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort('-createdAt');
    // }

    // FIELD LIMITTING
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select('fields'); //the code in this bracket is called projecting
    // } else {
    //   query = query.select('-__v');
    // }
    // PAGINATION
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);
    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new newError('This page does not exist');
    // }
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      timeRequest: req.reqTime,
      results: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(400).json({ status: 'Failed', message: error });
  }
};

exports.postTour = (req, res) => {
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res
  //       .status(201)
  //       .json({ status: 'success', data: { tour: newTour }, results: 1 });
  //   }
  // );
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'success', results: 1, data: { tour } });
  } catch (error) {
    res.status(400).json({ status: 'Failed', message: error });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    // const tour = await Tour.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: { message: 'Data successfylly deleted' },
    });
  } catch (error) {
    res.status(400).json({ status: 'Failed', message: error });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    return res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    res.status(400).json({ status: 'Failed', message: error });
  }
  // const tour = tours.find((el) => el.id === id);
  // if (!tour)
  //   return res.status(404).json({ status: 'failed', tour: 'Invalid id' });
  // res.status(200).json({ status: 'success', results: 1,
  // data: { tour } });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({ status: 'success', data: { tour: newTour } });
  } catch (error) {
    res.status(400).json({ status: 'Failed', message: error });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$diffficulty' },

          numTours: { $num: 1 },
          numRatings: { $num: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: {_id: {$ne: 'EASY'}}
      // }
    ]);
    res.statu(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      messge: err,
    });
  }
};
