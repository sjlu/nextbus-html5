var Data = function()
{
	var exports = {};
	var data = {};

	function read_config(d)
	{
		console.log(d.val());
	}

	function init()
	{
		data.config = new Firebase('https://gamma.firebase.com/nextbeezy/rutgers/config');
		data.config.once('value', read_config);
	}
	exports.init = init;

	return exports;
};