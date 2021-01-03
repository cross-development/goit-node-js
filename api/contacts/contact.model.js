//Core
const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	subscription: { type: String, required: true },
	password: { type: String, required: true },
	token: String,
});

mongoosePaginate.paginate.options = {
	lean: true,
	limit: 20,
};

contactSchema.plugin(mongoosePaginate);

module.exports = model('Contact', contactSchema);
