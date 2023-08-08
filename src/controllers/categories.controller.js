// const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { Category } = require('../models');

const categoryVerify = Joi.object({
    name: Joi.string().required(),
  });

const createCategory = async (req, res) => {
    const { name } = req.body;
    const { error } = categoryVerify.validate({ name });
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const category = await Category.findOne({ where: { name } });
    if (category) {
        return res.status(409).json({ message: 'Category already registered' });
      }

    if (!category) {
        return res.status(400).json({ message: '"name" is required' });
    }
    const newCategory = await Category.create({ name });

    return res.status(201).json(newCategory);
};

const getAllCategories = async (_req, res) => {
    const allCategories = await Category.findAll();
    return res.status(200).json(allCategories);
};

module.exports = {
    createCategory,
    getAllCategories,
};