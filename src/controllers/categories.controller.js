// const jwt = require('jsonwebtoken');
// const Joi = require('joi');
// const { Category } = require('../models');
const categoryService = require('../services/category.service');

// const categoryVerify = Joi.object({
//     name: Joi.string().required(),
//   });

const createCategory = async (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ message: '"name" is required' });
    }
    // const newCategory = await Category.create({ name });

    // return res.status(201).json(newCategory);
    try {
        const response = await categoryService.create(name);
        return res.status(201).json({ id: response.id, name });
    } catch (error) {
        res.status(400).json({ message: error.messsage });
    }
};

const getAllCategories = async (_req, res) => {
    try {
        const response = await categoryService.getAll();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
    
    // const allCategories = await Category.findAll();
    // return res.status(200).json(allCategories);
};

module.exports = {
    createCategory,
    getAllCategories,
};