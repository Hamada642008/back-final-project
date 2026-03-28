const supabase = require('../config/db');

class Users {
    static async signup(){
        const {data,error} = await supabase.auth.signUp({
            email,
            password
        })
        if (error) {
            throw error;
        }
        return data
    }

    static async login(){
        const {data,error} = await supabase.auth.signInWithPassword({
            email,password
        })
        if (error) {
            throw error;
        }
        return data.session();
    }
}

module.exports = Users