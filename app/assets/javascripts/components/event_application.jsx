class EventApplication extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 	events: [],
						sort: "name",
						order: "asc" };

		this.handleSearch = this.handleSearch.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleSortColumn = this.handleSortColumn.bind(this);
		this.handleUpdateRecord = this.handleUpdateRecord.bind(this);
		this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
	}

	componentDidMount() {
		const self = this;

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

	handleDeleteRecord(event) {
		var events = this.state.events.slice();
		const index = events.indexOf(event);
		events.splice(index,1);
		this.setState({ events: events });
	}

	handleUpdateRecord(old_event, event) {
		console.log(this.state);
		var events = this.state.events.slice();
		const index = events.indexOf(old_event);
		events.splice(index, 1, event);
		this.setState({ events: events });
	}

	handleSortColumn(name, order) {
		var self = this;
		if (this.state.sort != name) {order = 'asc';}
		$.ajax({
			data: {sort_by: name, order: order},
			url: '/api/events',
			type: 'GET',
			success(data) {
				self.setState({ events: data, sort: name, order: order });
			},
			error(xhr, status, error) {
				alert('Error sorting events: ', error);
			}
		});
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
			      <EventTable events={this.state.events}
			      			  sort={this.state.sort}
			      			  order={this.state.order} 
			      			  handleDeleteRecord={this.handleDeleteRecord}
			      			  handleUpdateRecord={this.handleUpdateRecord}
			      			  handleSortColumn={this.handleSortColumn} />
			    </div>
			  </div>
			</div>
		);
	}
}
/*


*/