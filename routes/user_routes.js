// routes/auth.js
const express = require('express');
const route = express.Router();
const supabase = require('../config/db'); 

// SIGNUP
route.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });
        if (error) return res.status(400).json({ error: error.message });
        res.json({ message: "User created successfully", user: data.user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN
route.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) return res.status(400).json({ error: error.message });
        res.json({ message: "Logged in successfully", token: data.session.access_token });
    } catch (err) {
        if (err.response) {
        console.error(err.response.data); 
        alert(err.response.data.error || 'Login failed');
    } else {
        console.error(err);
        alert('Login failed');
    }
        res.status(500).json({ error: err.message });
    }
});

// WELCOME (Protected)
const auth_middleware = require('../middleware/auth_middleware');
route.get('/', auth_middleware, async (req, res) => {
    res.json({
        message: "Welcome",
        user: req.user
    });
});

module.exports = route;