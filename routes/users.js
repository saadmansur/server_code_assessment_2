
     
const express = require('express');

const router = express.Router();

const userCredentialsController = require('../bin/controllers/UserController');

 

// GET /tourist-attractions - Retrieve all tourist attractions

// router.post('/', touristAttractionController.createTouristAttraction);

 

// GET /tourist-attractions/:id - Retrieve a specific tourist attraction

// router.get('/:id', touristAttractionController.getTouristAttractionById);

 

// POST /tourist-attractions - Create a new tourist attraction

router.post('/', userCredentialsController.createUserCredentials);

 

module.exports = router;
