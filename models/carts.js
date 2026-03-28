
const supabase = require('../config/db');

class Carts {
    static async add(user_id, product_id, quantity = 1) {
        const { data: existingItem, error } = await supabase
        .from('carts')
        .select('*')
        .eq('user_id', user_id)
        .eq('product_id', product_id)
        .maybeSingle();

        if (error) throw error;

        if (existingItem) {
        await supabase
            .from('carts')
            .update({ quantity: existingItem.quantity + quantity })
            .eq('id', existingItem.id);
        } else {
        await supabase
            .from('carts')
            .insert([{ user_id, product_id, quantity }]);
        }
    }

    static async getByUser(user_id) {
        const { data, error } = await supabase
        .from('carts')
        .select('*, products(*)')
        .eq('user_id', user_id);

        if (error) throw error;
        return data;
    }

    static async removeItem(cart_id) {
        const { error } = await supabase.from('carts').delete().eq('id', cart_id);
        if (error) throw error;
    }
}

module.exports = Carts;