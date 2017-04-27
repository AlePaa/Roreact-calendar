class Event extends React.Component {
	propTypes: {
		name: React.PropTypes.string,
		event_date: React.PropTypes.string,
		place: React.PropTypes.string,
		description: React.PropTypes.string
	}

	constructor(props){
		super(props);

		this.state = { edit: false, name: '', date: '', place: '', description: '' };
		this.onDelete = this.onDelete.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.renderRecord = this.renderRecord.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.isValidRecord = this.isValidRecord.bind(this);
	}

	handleToggle(e) {
		e.preventDefault();
		this.setState({ edit: !this.state.edit});
	}

	handleUpdate(e) {
		e.preventDefault();
		console.log(this.state);
		if(this.isValidRecord()) {
			const event_data = {
				name: this.state.name,
				description: this.state.description,
				date: this.state.date,
				place: this.state.place
			};
			$.ajax({
				method: 'PUT',
				url: '/api/events/' + this.props.event.id,
				data: { event: event_data },
				success(data) {
					this.props.handleUpdateRecord(this.props.event, data);
					this.setState({ edit: false});
				},
				error(xhr, status, error) {
					alert('Cannot update record:', error);
				}
			});
		} else { alert('Please fill all fields.');}
	}

	onDelete(e) {
		e.preventDefault();
		$.ajax({
			method: 'DELETE',
			url: '/api/events/' + this.props.event.id,
			success(data) {
				this.props.handleDeleteRecord(this.props.event);
			},
			error(xhr, status, error) {
				alert('Cannot delete requested record: ', error);
			}
		});
	}

	isValidRecord(){
		return (this.state.name &&
				this.state.place &&
				this.state.date &&
				this.state.description);
	}

	renderForm() {
		return (
			<tr>
				<td>
					<input name="name"
					defaultValue={this.props.event.name}
					className="form-control"
					type="text"
					onChange={event => this.setState({ name: event.target.value })}
					/>
					</td>
				<td>
					<input name="event_date"
					defaultValue={this.props.event.event_date}
					className="form-control"
					type="date"
					onChange={event => this.setState({ date: event.target.value })}
					/>
				</td>
				<td>
					<input name="place"
					defaultValue={this.props.event.place}
					className="form-control"
					type="text"
					onChange={event => this.setState({ place: event.target.value })}
					/>
				</td>
				<td>
					<input name="description"
					defaultValue={this.props.event.description}
					className="form-control"
					type="text"
					onChange={event => this.setState({ description: event.target.value })}
					/>
				</td>
				<td>
					<a className="btn btn-success btn-sm"
					onClick={this.handleUpdate}>
					Save
					</a>
					<a className="btn btn-default btn-sm"
					onClick={this.handleToggle} >
					Cancel
					</a>
				</td>
			</tr>
		);
	}

	renderRecord() {
		var event = this.props.event;
		return (
			<tr>
				<td>{event.name}</td>
				<td>{event.event_date}</td>
				<td>{event.place}</td>
				<td>{event.description}</td>
				<td>
					<a 	className="btn btn-danger btn-xs"
					onClick={this.onDelete} >
					Delete
					</a>
					<a 	className="btn btn-primary btn-xs"
					onClick={this.handleToggle} >
					Edit
					</a>
				</td>
			</tr>
			);
	}

	render() {
		return ((this.state.edit) ? this.renderForm() : this.renderRecord());
	}
}