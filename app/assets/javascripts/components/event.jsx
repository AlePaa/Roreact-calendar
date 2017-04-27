class Event extends React.Component {
	propTypes: {
		name: React.PropTypes.string,
		event_date: React.PropTypes.string,
		place: React.PropTypes.string,
		description: React.PropTypes.string
	}
	render() {
		var event = this.props.event;
		return (
			<tr>
				<td>{event.name}</td>
				<td>{event.event_date}</td>
				<td>{event.place}</td>
				<td>{event.description}</td>
			</tr>
		);
	}
}