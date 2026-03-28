const express = require('express');
const router = express.Router();
const auth_middleware = require('../middleware/auth_middleware');
const Carts = require('../models/carts');
const supabase = require('../config/db')

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
        
        const { data: carts, error: cartsError } = await supabase
            .from('carts')
            .select('*')
            .eq('user_id', userId);

        if (cartsError) throw cartsError;

        if (!carts || carts.length === 0) return res.json([]);

        
        const productIds = carts.map(c => c.product_id);
        const { data: products, error: productsError } = await supabase
            .from('products')
            .select('*')
            .in('id', productIds);

        if (productsError) throw productsError;

        
        const result = carts.map(c => {
            const product = products.find(p => p.id === c.product_id);
            return {
                quantity: c.quantity,
                product_id: c.product_id,
                name: product?.name || "Unknown",
                price: product?.price || 0,
                image: product?.image || ""
            };
        });

        res.json(result);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports= router;