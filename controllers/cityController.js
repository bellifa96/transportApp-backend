const { City } = require('../models');

// Récupérer toutes les villes
const getAllCities = async (req, res) => {
  try {
    const cities = await City.findAll();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des villes', error });
  }
};

// Créer une nouvelle ville
const createCity = async (req, res) => {
  try {
    const { name, postalCode, country } = req.body;
    const city = await City.create({ name, postalCode, country });
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la ville', error });
  }
};

// Récupérer une ville par son ID
const getCityById = async (req, res) => {
  try {
    const city = await City.findByPk(req.params.id);
    if (!city) {
      return res.status(404).json({ message: 'Ville non trouvée' });
    }
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la ville', error });
  }
};

// Mettre à jour une ville
const updateCity = async (req, res) => {
  try {
    const { name, postalCode, country } = req.body;
    const city = await City.findByPk(req.params.id);
    if (!city) {
      return res.status(404).json({ message: 'Ville non trouvée' });
    }

    await city.update({ name, postalCode, country });
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la ville', error });
  }
};

// Supprimer une ville
const deleteCity = async (req, res) => {
  try {
    const city = await City.findByPk(req.params.id);
    if (!city) {
      return res.status(404).json({ message: 'Ville non trouvée' });
    }

    await city.destroy();
    res.status(200).json({ message: 'Ville supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la ville', error });
  }
};

module.exports = {
  getAllCities,
  createCity,
  getCityById,
  updateCity,
  deleteCity
};
