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
	}

	add(contactInfo) {
		if (contactInfo) {
			if (contactInfo.hasOwnProperty('name') && contactInfo.hasOwnProperty('phone') && contactInfo.hasOwnProperty('email')) {
				this.contacts.push(contactInfo);
				this.updateStorage();
			}
		}
	}

	remove(index) {

	}

	search() {

	}

	getTotal() {
		return this.contacts.length;
	}

	list(contactsPerPage = 10, page = 1) {
		if (page < 0) {
			page = 1;
		}

		const start = (page - 1) * contactsPerPage;
		const end = (page) * contactsPerPage;

		return this.contacts.slice(start, end);
	}

	updateStorage() {
		localStorage.setItem('contacts', JSON.stringify(this.contacts));
	}

}

export default PhoneBook;