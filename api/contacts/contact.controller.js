//Model
const contactModel = require('./contact.model');

//Read: return contacts list
async function listContacts(req, res, next) {
	try {
		const contacts = await contactModel.find();

		return res.status(200).json(contacts);
	} catch (error) {
		next(error);
	}
}

//Read: return contact by id
async function getContactById(req, res, next) {
	try {
		const { contactId } = req.params;
		const contact = await contactModel.findOne({ _id: contactId });

		!contact ? res.status(404).json({ message: 'Not found' }) : res.status(200).json(contact);
	} catch (error) {
		next(error);
	}
}

//Create: receive contact data and return created contact with id
async function addContact(req, res, next) {
	try {
		const createdContact = await contactModel.create(req.body);

		return res.status(201).json(createdContact);
	} catch (error) {
		next(error);
	}
}

//Delete: remove contact by id
async function removeContact(req, res, next) {
	try {
		const { contactId } = req.params;
		const removedContact = await contactModel.findByIdAndDelete(contactId);

		!removedContact
			? res.status(404).json({ message: 'Not found' })
			: res.status(200).json({ message: 'contact deleted' });
	} catch (error) {
		next(error);
	}
}

//Update: update contact information by id
async function updateContact(req, res, next) {
	try {
		const { contactId } = req.params;
		const updatedContact = await contactModel.findByIdAndUpdate(
			contactId,
			{ $set: req.body },
			{ new: true },
		);

		!updatedContact
			? res.status(404).json({ message: 'Not found' })
			: res.status(200).json(updatedContact);
	} catch (error) {
		next(error);
	}
}

//Read: return contacts list with pagination (page - min=1, limit - min=5)
async function paginationContact(req, res, next) {
	const { page, limit } = req.query;

	if (!page && !limit) {
		next();
	}

	const option = {
		page: Number(page) < 1 ? 1 : Number(page),
		limit: Number(limit) < 5 ? 5 : Number(limit),
	};

	const results = await contactModel.paginate({}, option);

	const response = {
		data: results.docs,
		limitData: results.limit,
		totalData: results.totalDocs,
		page: results.page,
		totalPages: results.totalPages,
	};

	return res.status(200).json(response);
}

module.exports = {
	listContacts,
	addContact,
	removeContact,
	getContactById,
	updateContact,
	paginationContact,
};
