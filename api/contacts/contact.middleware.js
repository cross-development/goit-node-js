//Validation package
const Joi = require('joi');
//Mongoose validation ObjID
const {
	Types: { ObjectId },
} = require('mongoose');

//The middleware validate contact credential (create)
function validateCreateContact(req, res, next) {
	const createContactRules = Joi.object({
		name: Joi.string().min(3).max(30).required(),
		email: Joi.string().email().required(),
		phone: Joi.string()
			.pattern(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/)
			.required(),
		subscription: Joi.string().required(),
		password: Joi.string().min(6).max(20).required(),
	});

	const validatedContact = createContactRules.validate(req.body);

	if (validatedContact.error) {
		return res.status(400).send({ message: 'missing required name field' });
	}

	next();
}

//The middleware validate contact credential (update)
function validateUpdateContact(req, res, next) {
	const updateContactRules = Joi.object({
		name: Joi.string().min(3).max(30),
		email: Joi.string().email(),
		phone: Joi.string().pattern(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/),
		subscription: Joi.string(),
		password: Joi.string().min(6).max(20),
	}).min(1);

	const validatedContact = updateContactRules.validate(req.body);

	if (validatedContact.error) {
		return res.status(400).send({ message: 'missing fields' });
	}

	next();
}

//The middleware validate contact id (read, delete, update)
function validateContactID(req, res, next) {
	const { contactId } = req.params;

	if (!ObjectId.isValid(contactId)) {
		return res.status(400).send({ message: 'invalid id' });
	}

	next();
}

function validateContactPage(req, res, next) {
	const { page, limit } = req.query;

	if (!page && page !== '') {
		return next();
	}

	const isPageValid = Number(page) && Number(page) >= 1;

	if (!isPageValid) {
		return res.status(400).send({ message: 'The page must be a number and more than 0' });
	}

	if (!limit && limit !== '') {
		return next();
	}

	const isLimitValid = Number(limit) && Number(limit) >= 20;

	if (!isLimitValid) {
		return res.status(400).send({ message: 'The limit must be a number and more than 20' });
	}

	next();
}

module.exports = {
	validateCreateContact,
	validateUpdateContact,
	validateContactID,
	validateContactPage,
};
