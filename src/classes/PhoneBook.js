const MAX_CONTACTS = 10000;

class PhoneBook {
	contacts;

	constructor() {
		const data = localStorage.getItem('contacts');

		const contacts = JSON.parse(data);

		if (Array.isArray(contacts)) {
			this.contacts = contacts;
		} else {

			this.contacts = [
				{
					name: 'Test',
					phone: 'Test',
					email: 'Test'
				},
				{
					name: 'Test',
					phone: 'Test',
					email: 'Test'
				},
				{
					name: 'Test',
					phone: 'Test',
					email: 'Test'
				},
				{
					name: 'Test',
					phone: 'Test',
					email: 'Test'
				},
				{
					name: 'Test',
					phone: 'Test',
					email: 'Test'
				},
				{
					name: 'Test',
					phone: 'Test',
					email: 'Test'
				},
				{
					name: 'Test',
					phone: 'Test',
					email: 'Test'
				},
				{
					name: 'Test',
					phone: 'Test',
					email: 'Test'
				},
				{
					name: 'Test',
					phone: 'Test',
					email: 'Test'
				},
				{
					name: 'Test',
					phone: 'Test',
					email: 'Test'
				},
				{
					name: 'Test',
					phone: 'Test',
					email: 'Test'
				},
				{
					name: 'Test',
					phone: 'Test',
					email: 'Test'
				},
				{
					name: 'Test',
					phone: 'Test',
					email: 'Test'
				},
				{
					name: 'Test',
					phone: 'Test',
					email: 'Test'
				}
			];
		}

		this.contacts.forEach(function (contact, i) {
			contact.key = i;
		});

	}

	add(contactInfo) {
		if (contactInfo) {
			if (contactInfo.hasOwnProperty('name') && contactInfo.hasOwnProperty('phone') && contactInfo.hasOwnProperty('email')) {

				if (this.getTotal() < MAX_CONTACTS) {
					this.contacts.push(contactInfo);
					this.updateStorage();
				}
			}
		}
	}

	remove(index) {
		if (this.getContactByIndex(index)) {
			this.contacts.splice(index, 1);
			this.updateStorage();
		}
	}

	search() {

	}

	getTotal() {
		return this.contacts.length;
	}

	getContactByIndex(index) {
		if (this.contacts[index]) {
			return this.contacts[index];
		}
	}

	list(contactsPerPage = 10, page = 1) {
		if (page < 0) {
			page = 1;
		}

		const start = (page - 1) * contactsPerPage;
		const end = (page) * contactsPerPage;

		return this.contacts.slice(start, end);
	}

	getCountOfPage(contactsPerPage = 10) {
		return Math.ceil(this.getTotal() / contactsPerPage);
	}

	updateStorage() {
		localStorage.setItem('contacts', JSON.stringify(this.contacts));
	}

}

export default PhoneBook;