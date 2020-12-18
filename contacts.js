const fsPromises = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
	try {
		const data = await fsPromises.readFile(contactsPath, 'utf-8');
		const parsedData = JSON.parse(data);

		console.table(parsedData);
	} catch (error) {
		console.error(error);
	}
}

async function getContactById(contactId) {
	try {
		const data = await fsPromises.readFile(contactsPath, 'utf-8');
		const parsedData = JSON.parse(data);

		const contact = parsedData.find(({ id }) => id === contactId);

		console.table(contact);
	} catch (error) {
		console.error(error);
	}
}

async function removeContact(contactId) {
	try {
		const data = await fsPromises.readFile(contactsPath, 'utf-8');

		const updatedData = JSON.parse(data).filter(({ id }) => id !== contactId);
		const stringifyUpdatedData = JSON.stringify(updatedData, null, 2);

		await fsPromises.writeFile(contactsPath, stringifyUpdatedData, 'utf-8');

		console.log('The contact has been removed!');
	} catch (error) {
		console.error(error);
	}
}

async function addContact(name, email, phone) {
	try {
		const data = await fsPromises.readFile(contactsPath, 'utf-8');

		const id = JSON.parse(data).length + 1;

		const updatedData = JSON.parse(data).concat({ id, name, email, phone });
		const stringifyUpdatedData = JSON.stringify(updatedData, null, 2);

		await fsPromises.writeFile(contactsPath, stringifyUpdatedData, 'utf-8');

		console.log('The contact has been added!');
	} catch (error) {
		console.error(error);
	}
}

module.exports = { listContacts, getContactById, removeContact, addContact };
