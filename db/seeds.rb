1.upto(10) do |i|
	Event.create(name: "Event #{i}",
		description: "Sample event nr #{i}",
		event_date: Date.today + rand(3).months,
		place: "Place nr #{i}")
end