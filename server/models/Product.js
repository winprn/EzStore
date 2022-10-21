const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		originalPrice: {
			type: Number,
			required: true,
		},
		sellingPrice: {
			type: Number,
			required: true,
		},
		categories: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'category',
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('product', ProductSchema);
