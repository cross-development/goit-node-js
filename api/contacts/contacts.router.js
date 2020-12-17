//Core
const { Router } = require('express');
//Controller
const contactsController = require('./contacts.controller');
//Middleware
const contactsMiddleware = require('./contacts.middleware');

//Init router
const contactRouter = Router();

// @ GET /api/contacts
contactRouter.get('/', contactsController.listContacts);

// @ GET /api/contacts/:contactId
contactRouter.get('/:contactId', contactsController.getContactById);

// @ POST /api/contacts
contactRouter.post('/', contactsMiddleware.validateCreateContact, contactsController.addContact);

// @ DELETE /api/contacts/:contactId
contactRouter.delete('/:contactId', contactsController.removeContact);

// @ PATCH /api/contacts/:contactId
contactRouter.patch(
	'/:contactId',
	contactsMiddleware.validateUpdateContact,
	contactsController.updateContact,
);

module.exports = contactRouter;
