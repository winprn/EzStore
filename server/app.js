const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const app = express();

const UserRoute = require('./routes/user');
const AuthRoute = require('./routes/auth');
const ProductRoute = require('./routes/product');
const CategoryRoute = require('./routes/category');

const SERVER_PORT = process.env.SERVER_PORT;
const MONGOOSE_USER = process.env.MONGOOSE_DB_USER;
const MONGOOSE_PASSWORD = process.env.MONGOOSE_DB_PASSWORD;
mongoose
	.connect(
		`mongodb+srv://${MONGOOSE_USER}:${MONGOOSE_PASSWORD}@cluster0.wdfjd.mongodb.net/ezstore?retryWrites=true&w=majority`
	)
	.then(() => {
		console.log('Database connected');
	})
	.catch((e) => {
		console.log(e);
	});

app.use(cors());

app.use(express.json());
app.use('/api/users', UserRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/products', ProductRoute);
app.use('/api/categories', CategoryRoute);

app.listen(SERVER_PORT, () => {
	console.log(`app is running on port ${SERVER_PORT}`);
});
