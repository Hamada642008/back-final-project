const express = require('express');
const cors = require('cors');

const products = require('./routes/product_routes');
const users = require('./routes/user_routes');
const carts = require('./routes/carts_routes')

const port = process.env.PORT
const app = express();

app.use(express.json());
app.use(cors());

app.use('/products',products)
app.use('/user',users);
app.use('/cart',carts)

app.listen(port,()=>{
    console.log(`listening...`)
})



