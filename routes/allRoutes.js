// routes/allRoutes.js
const express = require('express');
const router = express.Router();
const AddController = require('../controller/AddController');
const multer = require('multer'); // Assuming you use multer for file uploads

const upload = multer({ dest: 'tmp/' }); // Temporary upload folder

// Create Sector
router.post('/sector', upload.fields([{ name: 'backgroundImage' }, { name: 'pdf' }]), AddController.createSector);

// Get all Sectors
router.get('/sectors', AddController.getAllSectors);

// Update Sector
router.put('/sector/:id', upload.fields([{ name: 'backgroundImage' }, { name: 'pdf' }]), AddController.updateSector);

// Delete Sector
router.delete('/sector/:id', AddController.deleteSector);

module.exports = router;
