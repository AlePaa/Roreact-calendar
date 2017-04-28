class SortColumn extends React.Component {

	constructor(props) {
		super(props);
		this.handleSort = this.handleSort.bind(this);
	}

	handleSort(e) {
		e.preventDefault();
		const order = this.props.order == 'desc' ? 'asc' : 'desc';
		this.props.handleSortColumn(this.props.name, order);
	}
	render() {
		const active = this.props.sort == this.props.name;
		const display_name = active ? <u>{this.props.text}</u> : this.props.text;
		var direction;
		if (active) {
			direction = this.props.order == "asc" ? 
			<span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
			: <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
		}
		return (
			<span onClick={this.handleSort}>
			  {display_name}
			  {direction}
			</span>
		);
	}
}