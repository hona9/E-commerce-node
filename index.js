const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');
const app = express();

app.use(cors());
app.options('*', cors());

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//routes
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const categoriesRoutes = require('./routes/categories');
const usersRoutes = require('./routes/users');

const api = process.env.API_URL;

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Database connection is ready.');
})
.catch((err) => {
    console.log(err)
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})