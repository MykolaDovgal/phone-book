class PhoneBook {
	contacts;

	constructor() {
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
			}
		];
	}

	add(contactInfo) {

	}

	remove(index) {

	}

	search() {

	}

	list(contactsPerPage = 10, page = 1) {
		if (page < 0) {
			page = 1;
		}

		const start = (page - 1) * contactsPerPage;
		const end = (page) * contactsPerPage;

		return this.contacts.slice(start, end);
	}
}

export default PhoneBook;