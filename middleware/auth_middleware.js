const supabase = require('../config/db');
const user = require('../models/users');

const auth_middleware = async (req,res,next) => {
    try {
        const token = req.headers.authrization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        const {data,error} = supabase.auth.getUser(token)

        if (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = data.user
        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = auth_middleware;