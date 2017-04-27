class EventApplication extends React.Component {
	constructor(props) {
		super(props);
		this.state = { events: [] };

		this.handleSearch = this.handleSearch.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}

	componentDidMount() {
		var self = this;

		$.ajax({
			url: '/api/events',
			success(data) {
				self.setState({ events: data });
			},
			error(xhr, status, error) {
				alert('Cannot get data from API', error);
			}
		});
	}

	handleSearch(events) {
		this.setState({ events: events });
	}

	handleAdd(event) {
		var events = this.state.events;
		events.push(event);
		this.setState({ events: events });
	}

	render() {
		return(
			<div className="container">
			  <div className="jumbotron">
			    <h1>Event Calendar</h1>
			  </div>
			  <div className="col-md-8">
          		<NewForm handleAdd={this.handleAdd} />
			  </div>
			  <div className="col-md-8">
			    <SearchForm handleSearch={this.handleSearch} />
			  </div>
			  <div className="row">
			    <div className="col-md-12">
			      <EventTable events={this.state.events} />
			    </div>
			  </div>
			</div>
		);
	}
}
/*


*/