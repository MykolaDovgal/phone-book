import React, {Component} from 'react';
import './Contacts.css';
import PhoneBook from "../classes/PhoneBook";

class Contacts extends Component {

	phoneBook = new PhoneBook();

	componentDidMount() {

	}

	render() {
		const data = this.getContactsTableData();
		return (
			<div className="contacts_wrapper">
				<div className="container">

					<div className="row">
						<div className="col-12">

							<h2>Contacts</h2>

							<table className="table table-striped table-bordered">
								<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">First Name</th>
									<th scope="col">Last Name</th>
									<th scope="col">Username</th>
								</tr>
								</thead>
								<tbody>

								{data}

								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}

	getContactsTableData = () => {

		return this.phoneBook.list().map(function (object, i) {
			return (
				<tr>
					<th scope="row">{i}</th>
					<td>{object.name}</td>
					<td>{object.phone}</td>
					<td>{object.email}</td>
				</tr>)
		})

	}
}

export default Contacts;