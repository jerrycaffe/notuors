const { Router } = require('express');
const express = require('express');
const {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  createTour,
  checkBody,
  aliasTopTours,
  getTourStats,
} = require('../controllers/tourController');

const tourRoutes = express.Router();
// tourRoutes.param('id', checkId)
tourRoutes.route('/tour-stats').get(getTourStats);
tourRoutes.route('/top-5-cheap').get(aliasTopTours, getAllTours);

tourRoutes.route('/').get(getAllTours).post(createTour);
tourRoutes.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = tourRoutes;
