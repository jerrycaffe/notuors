const express = require('express');
const {getAllTours, getTour, updateTour, deleteTour, createTour, checkBody } = require('../controllers/tourController')

const tourRoutes = express.Router()
// tourRoutes.param('id', checkId)


tourRoutes.route('/').get(getAllTours).post(createTour);
tourRoutes.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = tourRoutes;