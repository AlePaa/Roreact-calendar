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
		var self = this;
		if (this.isValidForm()) {
			$.ajax({
				url: '/api/events',
				method: 'POST',
				data: { event: self.state },
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
		console.log(e.target.value);
		var input_name = e.target.name;
		var value = e.target.value;
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
		      			ref={name => this.input = name}
		      			value={this.state.name}
		      			onChange={this.handleChange} />
		    </div>
		    <div className="form-group">
          	  <input 	type="text"
                 		className="form-control"
                 		name="place"
                 		placeholder="Place"
                 		ref={place => this.input = place}
                 		value={this.state.place}
                 		onChange={this.handleChange} />
			</div>
		    <div className="form-group">
		      <input 	type="date"
		      			className="form-control"
		      			name="event_date"
		      			placeholder="Event date"
		      			ref={event_date => this.input = event_date}
		      			value={this.state.event_date}
		      			onChange={this.handleChange} />
		    </div>
		    <div className="form-group">
		      <input 	type="text"
		      			className="form-control"
		      			name="description"
		      			placeholder="Description"
		      			ref={description => this.input = description}
		      			value={this.state.description}
		      			onChange={this.handleChange} />
		    </div>
		    <button type="submit" className="btn btn-primary">Add</button>
		  </form>
		);
	}
}