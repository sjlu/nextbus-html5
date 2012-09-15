var Geocoder = function()
{
	var exports = {};
	var current_location = {};
	var callback = {};

	function set_location(lat, lng)
	{
		current_location.lat = lat;
		current_location.lng = lng;
	}

	function get_location()
	{
		return current_location;
	}
	exports.get_location = get_location;

	function location_success(position)
	{
		set_location(position.coords.latitude, position.coords.longitude);
		callback.success(get_location());
	}

	function location_error() 
	{
		callback.error();
	}

	function init(success, error)
	{
		callback.success = success;
		callback.error = error;

		if (navigator.geolocation)
			navigator.geolocation.getCurrentPosition(location_success, location_error);
		else
			location_error();
	}
	exports.init = init;

	return exports;
}