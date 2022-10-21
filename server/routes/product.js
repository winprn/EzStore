const router = require('express').Router();
const { verifyAdmin } = require('../middleware/verifyToken');
const Category = require('../models/Category');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
	try {
		const products = await Product.find({}).limit(50);
		res.status(200).json(products);
	} catch (e) {
		res.status(500).send(e.message);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.status(200).json(product);
	} catch (e) {
		res.status(500).send(e.message);
	}
});

router.post('/', verifyAdmin, async (req, res) => {
	const product = new Product(req.body);
	try {
		const savedProduct = await product.save();
		console.log(savedProduct.categories);
		for (let cat of req.body.categories) {
			console.log(cat);
			const category = await Category.findById(cat);
			category.products.push(savedProduct);
			await category.save();
		}
		res.status(200).json(savedProduct);
	} catch (e) {
		res.status(500).send(e.message);
	}
});

router.delete('/:id', verifyAdmin, async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).send('deleted');
	} catch (e) {
		res.status(500).send(e.message);
	}
});

module.exports = router;
