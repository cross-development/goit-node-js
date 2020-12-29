//Model
const contactModel = require('./contact.model');

//Read: return contacts list
async function listContacts(req, res, next) {
	try {
		const contacts = await contactModel.paginate();

		const response = {
			results: contacts.docs,
			totalResults: contacts.totalDocs,
			page: contacts.page,
			totalPages: contacts.totalPages,
		};

		return res.status(200).json(response);
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
async function paginationContacts(req, res, next) {
	const { page, limit } = req.query;

	if (page || limit) {
		const defaultPage = 1;
		const defaultLimit = 5;
		
		const isPageValid = Number(page) && Number(page) > defaultPage;
		const isLimitValid = Number(limit) && Number(limit) > defaultLimit;

		const option = {
			page: isPageValid ? Number(page) : defaultPage,
			limit: isLimitValid ? Number(limit) : defaultLimit,
		};

		const contacts = await contactModel.paginate({}, option);

		const response = {
			results: contacts.docs,
			limitResults: contacts.limit,
			totalResults: contacts.totalDocs,
			page: contacts.page,
			totalPages: contacts.totalPages,
		};

		return res.status(200).json(response);
	}

	next();
}

//Read: return filtered contact list (query --> sub)
async function filtrationContacts(req, res, next) {
	if (req.query.sub) {
		const filteredContacts = await contactModel.find({ subscription: req.query.sub });

		return res.status(200).json(filteredContacts);
	}

	next();
}

module.exports = {
	listContacts,
	addContact,
	removeContact,
	getContactById,
	updateContact,
	paginationContacts,
	filtrationContacts,
};
