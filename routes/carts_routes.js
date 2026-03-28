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
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    try {
        const { data, error } = await supabase
            .from('carts')
            .select(`
                quantity,
                product_id,
                products (
                    id,
                    name,
                    price,
                    image
                )
            `)
            .eq('user_id', userId);

        if (error) throw error;

        const result = data.map(item => ({
            quantity: item.quantity,
            product_id: item.product_id,
            name: item.products?.name,
            price: item.products?.price,
            image: item.products?.image
        }));

        res.json(result);

    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Server Error" });
    }
});

// to delete cart
// حذف منتج من السلة
router.delete("/remove/:product_id", auth_middleware, async (req, res) => {
    const userId = req.user.id;
    const { product_id } = req.params;

    try {
        const { data, error } = await supabase
            .from("carts")
            .delete()
            .eq("user_id", userId)
            .eq("product_id", product_id);

        if (error) throw error;

        res.json({ message: "Item removed from cart" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports= router;