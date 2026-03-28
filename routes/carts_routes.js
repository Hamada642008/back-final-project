const express = require('express');
const router = express.Router();
const supabase = require('../config/db');
const auth_middleware = require('../middleware/auth_middleware')

// to add carts
router.post("/add", auth_middleware, async (req, res) => {
    const user_id = req.user.id;
    const { product_id } = req.body;

    const { data: existingItem } = await supabase
        .from("carts")
        .select("*")
        .eq("user_id", user_id)
        .eq("product_id", product_id)
        .single();

    if (existingItem) {
        await supabase
        .from("carts")
        .update({
            quantity: existingItem.quantity + 1,
        })
        .eq("id", existingItem.id);
    } else {
        await supabase.from("carts").insert([
        {
            user_id,
            product_id,
            quantity: 1,
        },
        ]);
    }

    res.json({ message: "Done" });
});

// to get carts 
router.get("/", auth_middleware, async (req, res) => {
    const user_id = req.user.id;

    const { data } = await supabase
        .from("carts")
        .select("*, products(*)")
        .eq("user_id", user_id);

    res.json(data);
});

module.exports = router