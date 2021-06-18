const express = require('express');
const propertyController = require('../../controllers/property.controller');

const router = express.Router();

router.route('/').post(propertyController.createProperty).get(propertyController.getProperties);

router
  .route('/:userId')
  .get(propertyController.getProperty)
  .patch(propertyController.updateProperty)
  .delete(propertyController.deleteProperty);

module.exports = router;
