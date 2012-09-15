var Nextbus = function()
{
	var exports = {};
	var agency = '';
	var config = null;
	var event_listener = null;

	function calculate_distance(lat1, lon1, lat2, lon2)
	{
		var R = 6371; // km Radius of earth
		var dLat = (lat2-lat1) * Math.PI / 180;
		var dLon = (lon2-lon1) * Math.PI / 180; 
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;

		return d;
	}

	function set_location(lat, lng, callback)
	{
		get_config(function(data) {
			var stops = data.stops;

			var curr_stop_title = null;
			var curr_closest_stop = null;
			var curr_distance = 999999999; // simulate infinity.

			for (var stop_name in stops)
			{
				var total = 0;
				var count = 0;
				for (var stop_id in stops[stop_name])
				{
					var latLng = stops[stop_name][stop_id].latLng;
					total += calculate_distance(lat, lng, latLng.lat, latLng.lng);
					count++;
				}

				var distance = total/count;

				if (distance < curr_distance)
				{
					curr_closest_stop = stops[stop_name];
					curr_distance = distance;
					curr_stop_title = stop_name;
				}
			}

			callback({
				title: curr_stop_title,
				stop: curr_closest_stop,
				distance: curr_distance
			});

			var stop = curr_closest_stop;
			for (var id in stop)
			{
				for (var line in stop[id].lines)
				{
					console.log('registered endpoint', id, line);

					var endpoint = new Firebase('https://gamma.firebase.com/nextbeezy/'+agency+'/predictions/'+line+'/'+id);
					endpoint.on('value', function(d) {
						var p = d.val();
						if (p == null)
							return;

						var id = d.ref().path.j[3];
						var line = d.ref().path.j[2];

						event_listener({
							line: stop[id].lines[line],
							predictions: p
						});
					});
				}
			}
		});
	}
	exports.set_location = set_location;

	function get_config(callback)
	{
		var endpoint = new Firebase('https://gamma.firebase.com/nextbeezy/'+agency+'/config');
		endpoint.once('value', function(d) {
			callback(d.val());
		});
	}

	function init(a, evt)
	{
		agency = a;
		event_listener = evt;
	}
	exports.init = init;

	return exports;
};