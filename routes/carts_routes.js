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
router.get("/", auth_middleware, async (req, res) => {
    const userId = req.user.id; 

    try {
        const query = `
        SELECT 
            c.quantity, 
            p.id AS product_id, 
            p.name, 
            p.price, 
            p.image
        FROM carts c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = $1
        `;
        const { rows } = await pool.query(query, [userId]);

        res.json(rows); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports= router;