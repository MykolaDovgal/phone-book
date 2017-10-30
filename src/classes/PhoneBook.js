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
					name: 'Test test',
					phone: '11-222-3333',
					email: 'test@test.com'
				},
				{
					name: 'Test test',
					phone: '11-222-3333',
					email: 'test@test.com'
				},
				{
					name: 'Test test',
					phone: '11-222-3333',
					email: 'test@test.com'
				},
				{
					name: 'Test test',
					phone: '11-222-3333',
					email: 'test@test.com'
				},
				{
					name: 'Test test',
					phone: '11-222-3333',
					email: 'test@test.com'
				},
				{
					name: 'Test test',
					phone: '11-222-3333',
					email: 'test@test.com'
				},
				{
					name: 'Test test',
					phone: '11-222-3333',
					email: 'test@test.com'
				},
				{
					name: 'Test test',
					phone: '11-222-3333',
					email: 'test@test.com'
				},
				{
					name: 'Test test',
					phone: '11-222-3333',
					email: 'test@test.com'
				},
				{
					name: 'Test test',
					phone: '11-222-3333',
					email: 'test@test.com'
				},
				{
					name: 'Test test',
					phone: '11-222-3333',
					email: 'test@test.com'
				},
				{
					name: 'Test test',
					phone: '11-222-3333',
					email: 'test@test.com'
				},
			];
		}

		this.addKey();

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

	search(search, contactsPerPage = 10, page = 1) {
		let result = this.contacts.filter(function (contact) {
			return contact.phone.search(new RegExp(search, 'i')) !== -1 || contact.name.search(new RegExp(search, 'i')) !== -1;
		});

		if (page < 0) {
			page = 1;
		}

		const start = (page - 1) * contactsPerPage;
		const end = (page) * contactsPerPage;

		return result.slice(start, end);
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
		this.addKey();
		localStorage.setItem('contacts', JSON.stringify(this.contacts));

	}

	addKey() {
		this.contacts.sort((a, b) => {
				return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0);
			}
		);

		this.contacts.forEach(function (contact, i) {
			contact.key = i;
		});
	}

}

export default PhoneBook;