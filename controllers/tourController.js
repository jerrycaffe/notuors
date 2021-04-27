const fs = require('fs');
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

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find()
    res.status(200).json({
      status: 'success',
      timeRequest: req.reqTime,
      results: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(400).json({status: "Failed", message: error})
  }
 const tours = await Tour.find()
 
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
      new: true, runValidators: true
    })
    res.status(200).json({ status: 'success', results: 1, data: {tour}});
    
  } catch (error) {
    res.status(400).json({status: "Failed", message: error})
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)
    // const tour = await Tour.findById(req.params.id)
   
    res.status(200).json({ status: 'success', data: {message: "Data successfylly deleted"}});
    
  } catch (error) {
    res.status(400).json({status: "Failed", message: error})
  }
};

exports.getTour = async (req, res) => {
  try {
   const tour = await Tour.findById(req.params.id)
   
  return res.status(200).json({
     status: 'success',
     data: {tour}
   })
   
  } catch (error) {
    res.status(400).json({status: "Failed", message: error})
  }
  // const tour = tours.find((el) => el.id === id);
  // if (!tour)
  //   return res.status(404).json({ status: 'failed', tour: 'Invalid id' });
  // res.status(200).json({ status: 'success', results: 1,
  // data: { tour } });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)

  res.status(201).json({ status: 'success', 
  data: { tour: newTour } 
});
  } catch (error) {
    res.status(400).json({status: "Failed", message: error})
  }
  
};
