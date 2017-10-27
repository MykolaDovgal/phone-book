import React, {Component} from 'react';
import $ from 'jquery';
import './Contacts.css';
import PhoneBook from "../classes/PhoneBook";

window.jQuery = $;

class Contacts extends Component {

	phoneBook = new PhoneBook();

	constructor() {
		super();
		this.state = {
			phoneBook: this.phoneBook,
			page: 1,
			contactsPerPage: 10,
			search: false
		};
	}


	componentDidMount() {
		$(document).on('click', '.removeContact', (e) => {
			this.handlerForRemoveContact(e);
		});

		$(document).on('click', '#contactNavigation li', (e) => {
			this.handlerForSetPage(e);
		});


	}

	render() {
		const data = this.getContactsTableData();
		const pagination = this.getPagination();

		return (
			<div className="contacts_wrapper">
				<div className="container">

					<div className="row">
						<div className="col-12">
							<br/>
							<div className="row">
								<div className="col-4">
									<h2 className="float-left">Contacts - {this.state.phoneBook.getTotal()} </h2>
								</div>

								<div className="col-4">
									<div className="form-group">
										<input onInput={this.handlerSearch} type="search" className="form-control"
										       id="inputSearch"
										       placeholder="Search contact"/>
									</div>
								</div>

								<div className="col-4">
									<button type="button" data-toggle="modal" data-target="#modalAddContact"
									        className="btn btn-primary float-right">Add contact
									</button>
								</div>
							</div>


							<table className="table table-striped table-bordered">
								<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">Phone</th>
									<th scope="col">E-mail</th>
									<th width="5%" scope="col">Action</th>
								</tr>
								</thead>
								<tbody>

								{data}

								</tbody>
							</table>
						</div>
					</div>

					{pagination}


				</div>

				<div className="modal fade" id="modalAddContact" tabIndex="-1" role="dialog">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Add contact</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form id="formAddContact" onSubmit={this.handlerAddForm}>
									<div className="form-group row">
										<label className="col-sm-5 col-form-label text-left">Name</label>
										<div className="col-sm-7">
											<input maxLength="100" required type="text" className="form-control"
											       id="inputName"
											       placeholder="Name"/>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-sm-5 col-form-label text-left">Phone (xx-xxx-xxxx)</label>
										<div className="col-sm-7">
											<input type="tel" maxLength="11" pattern="^\d{2}-\d{3}-\d{4}$" required
											       className="form-control" id="inputPhone"
											       placeholder="Phone"/>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-sm-5 col-form-label text-left">Email</label>
										<div className="col-sm-7">
											<input required type="email" className="form-control" id="inputEmail"
											       placeholder="Email"/>
										</div>
									</div>


								</form>
							</div>
							<div className="modal-footer">
								<button form="formAddContact" className="btn btn-primary">Add contact</button>
								<button id="modalClose" type="button" className="btn btn-secondary"
								        data-dismiss="modal">Close
								</button>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}

	getContactsTableData = () => {
		let contacts = [];
		if (this.state.search) {
			contacts = this.phoneBook.search(this.state.search, this.state.contactsPerPage, this.state.page);
		} else {
			contacts = this.phoneBook.list(this.state.contactsPerPage, this.state.page);
		}

		return contacts.map(function (object) {
			return (
				<tr>
					<th scope="row">{object.key}</th>
					<td>{object.name}</td>
					<td>{object.phone}</td>
					<td>{object.email}</td>
					<td data-index={object.key} className="removeContact">
						<button title={`Remove contact ${object.name}`} type="button" className="close"
						        aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</td>
				</tr>)
		})

	};

	getPagination = () => {
		let pages = [];
		const _t = this;
		for (let i = 0; i < this.phoneBook.getCountOfPage(this.state.contactsPerPage); i++) {
			pages.push(i + 1);
		}
		return (
			<div className="row">
				<div className="col-12">
					<nav aria-label="Page navigation">
						<ul className="pagination" id="contactNavigation">
							<li data-page={_t.state.page - 1} className="page-item">
								<a className="page-link" aria-label="Previous">
									<span aria-hidden="true">&laquo;</span>
									<span className="sr-only">Previous</span>
								</a>
							</li>

							{pages.map(function (i) {
								let className = (i === _t.state.page) ? 'page-item active' : 'page-item';

								return (
									<li data-page={i} className={className}><a className="page-link " href="#">{i}</a>
									</li>)
							})}

							<li data-page={_t.state.page + 1} className="page-item">
								<a className="page-link" href="#" aria-label="Next">
									<span aria-hidden="true">&raquo;</span>
									<span className="sr-only">Next</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		);
	};

	handlerAddForm = (e) => {
		e.preventDefault();
		const form = $(e.target);

		const name = form.find('#inputName').val();
		const phone = form.find('#inputPhone').val();
		const email = form.find('#inputEmail').val();

		console.log({name, phone, email});

		if (name && phone && email) {
			this.phoneBook.add({name, phone, email});
			alert(`Contact ${name} added`);
			$('#modalClose').trigger('click');
			this.updateContact();
		} else {
			alert('Error, check input data');
		}


		return false;
	};

	handlerForRemoveContact = (e) => {
		const element = $(e.target);
		const td = element.parents('td');
		const index = +td.data('index');

		if (!isNaN(index)) {
			const contact = this.phoneBook.getContactByIndex(index);
			if (contact) {
				let remove = window.confirm(`Do you want to remove contact ${contact.name}?`);
				if (remove) {
					this.phoneBook.remove(index);
					this.updateContact();
				}
			}
		}
	};

	handlerSearch = (e) => {
		const search = $(e.target).val();

		if (search) {
			this.setState({
				search: search
			})
		} else {
			this.setState({
				search: false
			})
		}
	};

	handlerForSetPage = (e) => {
		const element = $(e.target);

		const li = element.parents('li');
		let page = +li.data('page');

		if (!isNaN(page)) {
			if (page < 1) {
				page = 1;
			}
			this.setState({
				page: page
			});
		}
	};

	updateContact = () => {
		this.setState({
			phoneBook: this.phoneBook
		});
	}
}

export default Contacts;