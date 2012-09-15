/**
 * Write all your event listeners in the 
 * document.ready function or else they
 * may not bind correctly. As a side note, I like
 * to just call a public function in a class
 * to handle all your bindings here.
 */
$(document).ready(function() {
   var frontpage = new Frontpage();
   var nextbus = new Nextbus();
   var geocoder = new Geocoder();
    
	frontpage.init();
	nextbus.init('rutgers', function(d) {
		frontpage.write_prediction(d);
	});

	geocoder.init(function(latLng)
	{
		nextbus.set_location(latLng.lat, latLng.lng, function(d)
		{
			frontpage.set_title(d.title);	
		});
	});
});