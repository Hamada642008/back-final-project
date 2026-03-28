const express = require('express');
const router = express.Router();
const auth_middleware = require('../middleware/auth_middleware');
const Carts = require('../models/carts');

// to add cart
router.post('/add', auth_middleware, async (req, res) => {
    try {
        const user_id = req.user.id;
        const { product_id, quantity } = req.body;

        await Carts.add(user_id, product_id, quantity || 1);
        res.json({ message: 'Added to cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// to get carts
router.get('/', auth_middleware, async (req, res) => {
    try {
        const user_id = req.user.id;
        const data = await Carts.getByUser(user_id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});