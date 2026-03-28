const {createClient} = require('@supabase/supabase-js');
const env = require('dotenv');
env.config();

const supabase_url = process.env.SUPABASE_URL
const supabase_key = process.env.SUPABASE_KEY
const port = process.env.PORT;

const supabase = createClient(supabase_url,supabase_key);

module.exports = supabase
