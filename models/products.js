const supabase = require('../config/db');

class Products {
    static async find_all() {
        const {data,error} = await supabase.from('products').select('*');
        if (error) {
            throw error;
        }
        return data ;
    }

    static async find_by_id(id){
        // eq('id',id).single  => where id=? 
        // example:  where id=1
        const {data,error} = await supabase.from('products').select('*').eq('id',id).single();
        if (error) {
            throw error;
        }
        return data ;
    }
    static async create(product){
        const {data,error} = await supabase.from('products').insert(product).select().single();
        if (error) {
            throw error;
        }
        return data ;
    }

    static async update(id,product){
        const {data,error} = await supabase.from('products').update(product).eq('id',id).select().single();
        if (error) {
            throw error;
        }
        return data ;
    }

    static async delete(id){
        const {data,error} = await supabase.from('products').delete().eq('id',id).select().single();
        if (error) {
            throw error;
        }
        return data ;
    }
}

module.exports = Products