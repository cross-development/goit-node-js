//Core
const { Router } = require('express');
//Controller
const contactsController = require('./contact.controller');
//Middleware
const contactsMiddleware = require('./contact.middleware');

const {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
	filtrationContacts,
} = contactsController;

const {
	validateCreateContact,
	validateUpdateContact,
	validateContactID,
	validateContactPage,
} = contactsMiddleware;

//Init router
const contactRouter = Router();

// @ GET /api/contacts or /contacts?sub=free or /api/contacts?page=1&limit=10
contactRouter.get('/', filtrationContacts, validateContactPage, listContacts);

// @ GET /api/contacts/:contactId
contactRouter.get('/:contactId', validateContactID, getContactById);

// @ POST /api/contacts
contactRouter.post('/', validateCreateContact, addContact);

// @ DELETE /api/contacts/:contactId
contactRouter.delete('/:contactId', validateContactID, removeContact);

// @ PATCH /api/contacts/:contactId
contactRouter.patch('/:contactId', validateContactID, validateUpdateContact, updateContact);

module.exports = contactRouter;
