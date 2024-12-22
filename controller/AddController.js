// controller/AddController.js
const Sector = require('../models/Sector');
const cloudinary = require('cloudinary').v2;  // Assuming cloudinary is set up in the config

// Create a new Sector
exports.createSector = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { backgroundImage, pdf } = req.files; // Assume files are sent in the request

    // Upload background image to Cloudinary
    const backgroundImageResult = await cloudinary.uploader.upload(backgroundImage.tempFilePath, {
      folder: 'sectors/backgrounds'
    });

    // Upload PDF to Cloudinary
    const pdfResult = await cloudinary.uploader.upload(pdf.tempFilePath, {
      resource_type: 'raw',
      folder: 'sectors/pdfs'
    });

    const newSector = new Sector({
      name,
      description,
      backgroundImage: backgroundImageResult.secure_url,
      pdf: pdfResult.secure_url
    });

    await newSector.save();
    res.status(201).json({ message: 'Sector created successfully', sector: newSector });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all Sectors
exports.getAllSectors = async (req, res) => {
  try {
    const sectors = await Sector.find();
    res.status(200).json(sectors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a Sector
exports.updateSector = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedFields = { name, description };

    if (req.files) {
      if (req.files.backgroundImage) {
        const backgroundImageResult = await cloudinary.uploader.upload(req.files.backgroundImage.tempFilePath, {
          folder: 'sectors/backgrounds'
        });
        updatedFields.backgroundImage = backgroundImageResult.secure_url;
      }
      if (req.files.pdf) {
        const pdfResult = await cloudinary.uploader.upload(req.files.pdf.tempFilePath, {
          resource_type: 'raw',
          folder: 'sectors/pdfs'
        });
        updatedFields.pdf = pdfResult.secure_url;
      }
    }

    const updatedSector = await Sector.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!updatedSector) {
      return res.status(404).json({ message: 'Sector not found' });
    }

    res.status(200).json({ message: 'Sector updated successfully', sector: updatedSector });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a Sector
exports.deleteSector = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSector = await Sector.findByIdAndDelete(id);
    if (!deletedSector) {
      return res.status(404).json({ message: 'Sector not found' });
    }
    res.status(200).json({ message: 'Sector deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
