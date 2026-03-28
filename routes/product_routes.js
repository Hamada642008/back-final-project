const express = require('express');
const product = require('../models/products');
const route = express.Router();

route.get('/', async (req,res) => {
    try {
        const products = await product.find_all();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

route.get('/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const products = await product.find_by_id(id);
        if (!products) {
            res.status(404).json({error: 'Not Found'})
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

route.post('/create',async (req,res) => {
    try {
        const create_product = req.body
        const products = await product.create(create_product);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

route.put('/update/:id',async (req,res) => {
    try {
        const id = req.params.id;
        const update_product = req.body
        const products = await product.update(id,update_product);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

route.delete('/delete/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const products = product.delete(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = route