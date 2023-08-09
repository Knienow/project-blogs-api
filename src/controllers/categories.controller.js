const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ message: '"name" is required' });
    }
    
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
};

module.exports = {
    createCategory,
    getAllCategories,
};