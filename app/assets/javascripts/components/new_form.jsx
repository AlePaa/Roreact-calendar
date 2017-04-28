class NewForm extends React.Component {
	propTypes: {
		name: React.PropTypes.string,
		event_date: React.PropTypes.string,
		place: React.propTypes.string,
		description: React.PropTypes.string
	}

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			place: '',
			event_date: '',
			description: ''
		};

		this.handleAdd = this.handleAdd.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleAdd(e) {
		e.preventDefault();
		const self = this;
		if (this.isValidForm()) {
			$.ajax({
				data: { event: self.state },
				dataType: "json",
				url: '/api/events',
				type: 'POST',
				success(data) {
					self.props.handleAdd(data);
					self.setState(self.getInitialState());
				},
				error(xhr, status, error) {
					alert('Cannot add a new record: ', error);
				}
			})
		} else {
			alert('Please fill all fields.');
		}
	}
	
	isValidForm() {
		return (this.state.name && this.state.place &&
        this.state.event_date && this.state.description);
	}

	handleChange(e) {
		const input_name = e.target.name;
		const value = e.target.value;
		this.setState({ [input_name] : value });
	}

	render() {
		return (
		  <form className="form-inline" onSubmit={this.handleAdd}>
		    <div className="form-group">
		      <input 	type="text"
		      			className="form-control"
		      			name="name"
		      			placeholder="Name"
		      			value={this.state.name}
		      			onChange={this.handleChange} />
		    </div>
		    <div className="form-group">
          	  <input 	type="text"
                 		className="form-control"
                 		name="place"
                 		placeholder="Place"
                 		value={this.state.place}
                 		onChange={this.handleChange} />
			</div>
		    <div className="form-group">
		      <input 	type="date"
		      			className="form-control"
		      			name="event_date"
		      			placeholder="Event date"
		      			value={this.state.event_date}
		      			onChange={this.handleChange} />
		    </div>
		    <div className="form-group">
		      <input 	type="text"
		      			className="form-control"
		      			name="description"
		      			placeholder="Description"
		      			value={this.state.description}
		      			onChange={this.handleChange} />
		    </div>
		    <button type="submit" className="btn btn-primary">Add</button>
		  </form>
		);
	}
}