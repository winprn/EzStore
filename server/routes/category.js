const router = require('express').Router();
const { verifyAdmin } = require('../middleware/verifyToken');
const Category = require('../models/Category');
const Product = require('../models/Product');

router.get('/', verifyAdmin, async (req, res) => {
	try {
		const categories = await Category.find({});
		res.status(200).json(categories);
	} catch (e) {
		res.status(500).send(e.message);
	}
});

router.post('/', verifyAdmin, async (req, res) => {
	const newCategory = new Category(req.body.category);
	console.log(req.body.category);
	try {
		await newCategory.save();
		res.status(201).send(newCategory);
	} catch (e) {
		res.status(500).send(e.message);
	}
});

router.get('/:id', verifyAdmin, async (req, res) => {
	try {
		const categories = await Category.findById(req.params.id).populate(
			'products'
		);
		res.status(200).json(categories);
	} catch (e) {
		res.status(500).send(e.message);
	}
});

module.exports = router;
