class SearchForm extends React.Component {
	
	constructor(props) {
		super(props);

		this.onSearch = this.onSearch.bind(this);
	}

	onSearch() {
		const query = this.input.value;
		const self = this;
		$.ajax({
			url: '/api/events/search',
			data: { query: query },
			success: function(data) {
				self.props.handleSearch(data);
			},
			error: function(xhr, status, error) {
				alert('Search error: ', status, xhr, error);
			}
		});
	}

	render() {
		return (
			<input 	onChange={this.onSearch}
					type="text"
					className="form-control"
					placeholder="Type to search..."
					ref={query => this.input = query}/>
		);
	}
}